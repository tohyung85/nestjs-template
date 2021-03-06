import { HttpService } from '@nestjs/axios';
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ExchangeTokenDto } from './exchange-token.dto';
import { ProviderUserDto } from './provider-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ValidateProviderTokenPipe
  implements PipeTransform<ExchangeTokenDto, Promise<ProviderUserDto>>
{
  constructor(private readonly http: HttpService) {}

  async transform(
    value: ExchangeTokenDto,
    metadata: ArgumentMetadata,
  ): Promise<ProviderUserDto> {
    const validUserData = await this.validateProviderTokens(value);
    return validUserData;
  }

  private async validateProviderTokens(exchangeTokenDto: ExchangeTokenDto) {
    const { provider, providerToken } = exchangeTokenDto;

    if (provider === 'facebook')
      return this.validateFacebookToken(providerToken);
    throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE);
  }

  private async validateFirebaseToken(token) {}

  private async validateFacebookToken(token) {
    try {
      const checkUserResponse = await lastValueFrom(
        this.http.get(`https://graph.facebook.com/me?access_token=${token}`),
      );

      let firstName = '';
      let lastName = '';

      const { name, id } = checkUserResponse.data;
      if (name) {
        const nameArr = name.split(' ');
        firstName = nameArr.length > 0 ? nameArr[0] : '';
        lastName =
          nameArr.length > 1 ? nameArr.slice(1, nameArr.length).join(' ') : '';
      }

      const userDataResponse = await lastValueFrom(
        this.http.get(
          `https://graph.facebook.com/${id}?fields=id,name,email,picture&access_token=${token}`,
        ),
      );

      const { email, picture } = userDataResponse.data;

      return { email, firstName, lastName, id, avatar: picture.data?.url };
    } catch (error) {
      console.log('error', error);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
