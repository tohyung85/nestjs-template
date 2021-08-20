import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(user) {
    const accessToken = await this.jwtService.signAsync(user, {
      expiresIn: '5m',
    });
    const refreshToken = await this.jwtService.signAsync(user, {
      expiresIn: '6h',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const secret = this.configService.get<string>('JWT_SECRET');

    try {
      const user = await this.jwtService.verifyAsync(token, { secret });

      if (
        !user
        // ||!this.refTokens[user.email]
        //|| this.refTokens[user.email] !== refreshToken
      )
        throw 'Invalid refresh';

      delete user.iat;
      delete user.exp;

      const newTokens = await this.generateTokens(user);
      return newTokens;
    } catch (error) {
      console.log('error', error);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
