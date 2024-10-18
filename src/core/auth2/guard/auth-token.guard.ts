import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extraTokenFromHeader(request);

    if (!token) {
      return false;
    }

    return true;
  }

  extraTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers?.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return;
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
      return;
    }
    return token;
  }
}
