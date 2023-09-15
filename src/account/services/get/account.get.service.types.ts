import { Account } from 'src/account/domain/entity/account.entity';

export type GetAccountServiceParamsDTO = {
  by: { email?: string };
};

export type GetAccountServiceResponseDTO = {
  account?: Account;
};
