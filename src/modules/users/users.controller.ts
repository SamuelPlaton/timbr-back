import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Put,
  Body,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const user = await this.usersService.findOneWithRelations(
      { id: req.user.id },
      ['onboarding', 'subscriptions'],
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = user;
    return { data: result };
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProfile(@Request() req, @Body() body: { email?: string }) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const updatedUser = await this.usersService.update(user, body);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = updatedUser;
    return { data: result };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = user;
    return { data: result };
  }

  @Get(':id/verify/:code')
  async verifyEmail(@Param('id') id: string, @Param('code') code: string) {
    const isVerified = await this.authService.verifyEmail(id, code);

    if (!isVerified) {
      throw new BadRequestException('Code de vérification invalide');
    }

    return {
      message: 'Email vérifié avec succès',
    };
  }
}
