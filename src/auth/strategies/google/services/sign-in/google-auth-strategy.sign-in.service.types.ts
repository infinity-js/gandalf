import { Account } from 'src/account/services/account.service.entity';

export type GoogleAuthStrategySignInServiceParamsDTO = {
  code: string;
};

export type GoogleAuthStrategySignInServiceResponseDTO = {
  account: Account;
};
