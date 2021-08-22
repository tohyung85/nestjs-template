import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;
    console.log('auth token', authToken);
    try {
      const payload = await this.authService.verifyToken(authToken);
      request.user = payload;
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
