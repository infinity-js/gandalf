import { AccountBase } from 'src/account/domain/entity/account.base.entity';

export type GetAccountServiceParamsDTO = {
  by: { email?: string };
};

export type GetAccountServiceResponseDTO = {
  account?: AccountBase;
};
