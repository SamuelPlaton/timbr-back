import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    // If access_token is in cookies and not in authorization header, add it
    console.log('AUTH??', { cookies: req.cookies, headers: req.headers });
    if (req.cookies?.access_token && !req.headers.authorization) {
      req.headers.authorization = `Bearer ${req.cookies.access_token}`;
      console.log(
        '[JWT Guard] Found token in cookies, added to authorization header',
      );
    }

    console.log('[JWT Guard] Checking authentication');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('[JWT Guard] Handle request:', {
      error: err?.message,
      user: user?.email,
      info: info?.message,
    });

    if (err || !user) {
      console.error('[JWT Guard] Authentication failed:', {
        error: err?.message,
        info: info?.message,
        hasUser: !!user,
      });
      throw err || new UnauthorizedException('Token invalide ou expiré');
    }

    console.log('[JWT Guard] Authentication successful for user:', user.email);
    return user;
  }
}
