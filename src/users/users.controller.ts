import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Request, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { ExchangeTokenDto } from './exchange-token.dto';
import { ProviderUserDto } from './provider-user.dto';
import { RefreshTokenDto } from './refresh-token.dto';
import { ValidateProviderTokenPipe } from './validate-provider-token.pipe';

@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}
  @Post('exchange-token')
  async exchangeToken(
    @Body(ValidateProviderTokenPipe) providerUserDto: ProviderUserDto,
  ) {
    return this.authService.generateTokens(providerUserDto);
  }
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const { token } = refreshTokenDto;
    return this.authService.refreshToken(token);
  }
}
