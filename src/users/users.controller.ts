import { Body, Controller, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { ProviderUserDto } from '../auth/provider-user.dto';
import { RefreshTokenDto } from '../auth/refresh-token.dto';
import { ValidateProviderTokenPipe } from '../auth/validate-provider-token.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
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
  @Post('test')
  async testAdd() {
    const result = await this.userService.testAdd();
    return result;
  }
}
