import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { Response, Request } from 'express';

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    // Only capture 5xx errors to Sentry (server errors, not client errors)
    if (status >= 500) {
      Sentry.captureException(exception, (scope) => {
        scope.setTag('url', request.url);
        scope.setTag('method', request.method);
        scope.setTag('statusCode', status.toString());
        scope.setUser({
          ip_address: request.ip,
          // Add user info if available from auth
          ...(request.user && { id: (request.user as any).id }),
        });
        scope.setContext('request', {
          url: request.url,
          method: request.method,
          headers: request.headers,
          body: request.body,
        });
        return scope;
      });
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof message === 'string'
          ? message
          : (message as any).message || message,
    });
  }
}
