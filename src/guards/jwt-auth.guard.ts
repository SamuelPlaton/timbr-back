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
    if (req.cookies?.access_token && !req.headers.authorization) {
      req.headers.authorization = `Bearer ${req.cookies.access_token}`;
      console.log(
        '[JWT Guard] Found token in cookies, added to authorization header',
      );
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Token invalide ou expiré');
    }

    return user;
  }
}
