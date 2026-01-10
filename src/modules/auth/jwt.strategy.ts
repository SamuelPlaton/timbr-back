import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UsersService))
    readonly usersService: UsersService,
    private configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error(
        'ERREUR DE SÉCURITÉ CRITIQUE: La variable d\'environnement JWT_SECRET n\'est pas définie. ' +
          'L\'application ne peut pas démarrer sans un secret JWT sécurisé.',
      );
    }

    if (jwtSecret.length < 32) {
      throw new Error(
        'ERREUR DE SÉCURITÉ CRITIQUE: JWT_SECRET doit contenir au moins 32 caractères. ' +
          'Longueur actuelle: ' +
          jwtSecret.length,
      );
    }

    if (
      jwtSecret === 'changeme' ||
      jwtSecret.toLowerCase().includes('secret') ||
      jwtSecret.toLowerCase().includes('password')
    ) {
      throw new Error(
        'ERREUR DE SÉCURITÉ CRITIQUE: JWT_SECRET semble être une valeur faible ou par défaut. ' +
          'Veuillez utiliser une chaîne aléatoire cryptographiquement forte.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    console.log('[JWT Strategy] Validating token payload:', { sub: payload.sub });

    if (!payload.sub) {
      console.error('[JWT Strategy] No user ID in token payload');
      return null;
    }

    const user = await this.usersService.findOne({ id: payload.sub });

    if (!user) {
      console.error('[JWT Strategy] User not found:', payload.sub);
      return null;
    }

    console.log('[JWT Strategy] User validated successfully:', user.email);
    return user;
  }
}
