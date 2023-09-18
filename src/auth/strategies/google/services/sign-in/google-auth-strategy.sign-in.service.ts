import { GoogleOAuthService } from 'src/auth/strategies/infra/google-oauth.service';
import {
  GoogleAuthStrategySignInServiceParamsDTO,
  GoogleAuthStrategySignInServiceResponseDTO,
} from './google-auth-strategy.sign-in.service.types';
import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/services/account/account.service';

type Params = GoogleAuthStrategySignInServiceParamsDTO;
type Response = GoogleAuthStrategySignInServiceResponseDTO;

@Injectable()
export class GoogleAuthStrategySignInService {
  constructor(
    private readonly googleOAuthService: GoogleOAuthService,
    private readonly accountService: AccountService,
  ) {}

  async execute(params: Params): Promise<Response> {
    const { email } = await this.googleOAuthService.verifyCode(params);

    const { account } = await this.accountService.getOrCreate({
      get: { by: { email } },
      create: { data: { email } },
    });

    return { account };
  }
}
