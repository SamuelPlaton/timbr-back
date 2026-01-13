import {
  BadRequestException,
  Body,
  Controller,
  forwardRef,
  Inject,
  NotFoundException,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { BrevoService } from '../brevo/brevo.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RefreshDto,
  RegisterDto,
  ResetPasswordDto,
} from './request.dto';

export class AuthAttributes {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

const ACCESS_TOKEN_EXPIRES_IN = 60 * 15; // 15 minutes

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private brevoService: BrevoService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() body: RegisterDto): Promise<{ data: AuthAttributes }> {
    const existingUser = await this.userService.findOne({ email: body.email });

    if (existingUser) {
      throw new ConflictException('Un compte avec cet email existe déjà');
    }

    const hashedPassword = await this.authService.hashPassword(body.password);
    const user = await this.userService.create({
      email: body.email,
      password_hash: hashedPassword,
    });

    await this.brevoService.createOrUpdateContact(body.email);

    return {
      data: {
        access_token: this.authService.generateAccessToken(user.id),
        refresh_token: await this.authService.generateRefreshToken(user.id),
        expires_in: ACCESS_TOKEN_EXPIRES_IN,
      },
    };
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() body: LoginDto): Promise<{ data: AuthAttributes }> {
    const user = await this.userService.findOne({ email: body.email });

    const passwordHash =
      user?.password_hash ?? '$2b$10$invalidhashtopreventtimingattack';
    const isValid = await this.authService.comparePasswords(
      body.password,
      passwordHash,
    );

    if (!isValid || !user)
      throw new UnauthorizedException('Identifiants invalides');

    return {
      data: {
        access_token: this.authService.generateAccessToken(user.id),
        refresh_token: await this.authService.generateRefreshToken(user.id),
        expires_in: ACCESS_TOKEN_EXPIRES_IN,
      },
    };
  }

  @Post('refresh')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async refresh(@Body() body: RefreshDto) {
    const existingRefreshToken = await this.authService.findRefreshToken({
      token: body.refresh_token,
    });

    this.validateRefreshToken(existingRefreshToken);

    const payload = this.authService['jwtService'].verify(body.refresh_token);

    return {
      data: {
        access_token: this.authService.generateAccessToken(payload.sub),
        expires_in: ACCESS_TOKEN_EXPIRES_IN,
      },
    };
  }

  private validateRefreshToken(token: any): void {
    if (!token) {
      throw new UnauthorizedException('Token de rafraîchissement invalide');
    }

    if (token.expires_at < new Date()) {
      throw new UnauthorizedException('Token de rafraîchissement expiré');
    }
  }

  @Post('forgot-password')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    const user = await this.userService.findOne({ email: body.email });

    if (!user) {
      return {
        message:
          'Si cet email existe, un lien de réinitialisation a été envoyé.',
      };
    }

    const token = await this.authService.generatePasswordResetToken(user.id);

    // Send password reset email via Brevo
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    await this.brevoService.sendTransactionalEmail(user.email, 1, {
      RESET_PASSWORD_LINK: resetLink,
    });

    return {
      message: 'Si cet email existe, un lien de réinitialisation a été envoyé.',
    };
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async resetPassword(@Body() body: ResetPasswordDto) {
    const resetToken = await this.authService.findPasswordResetToken({
      token: body.token,
    });

    if (!resetToken) {
      throw new BadRequestException(
        'Token de réinitialisation invalide ou expiré',
      );
    }

    if (resetToken.expires_at < new Date()) {
      await this.authService.deletePasswordResetToken(resetToken.id);
      throw new BadRequestException(
        'Token de réinitialisation invalide ou expiré',
      );
    }

    const user = await this.userService.findOne({ id: resetToken.user.id });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const hashedPassword = await this.authService.hashPassword(body.password);
    await this.userService.update(user, {
      password_hash: hashedPassword,
    });

    await this.authService.deletePasswordResetToken(resetToken.id);

    return {
      message: 'Le mot de passe a été réinitialisé avec succès',
    };
  }
}
