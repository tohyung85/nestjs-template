import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
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
  @Post('sign-in')
  async signIn(
    @Body(ValidateProviderTokenPipe) providerUserDto: ProviderUserDto,
  ) {
    console.log(providerUserDto);
    const { email, firstName, lastName, avatar } = providerUserDto;
    const existingUser = await this.userService.findUserByEmail(email);
    if (!existingUser)
      await this.userService.create({ email, firstName, lastName });

    return this.authService.generateTokens(providerUserDto);
  }
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const { token } = refreshTokenDto;
    return this.authService.refreshToken(token);
  }
  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Request() req) {
    const { email } = req.user;

    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    return user;
  }
}
