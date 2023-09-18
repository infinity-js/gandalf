import { AccountBase } from 'src/account/domain/entity/account.base.entity';
import { CreateAccountDTO } from 'src/account/domain/entity/account.base.entity.types';

export type CreateAccountServiceParamsDTO = {
  data: CreateAccountDTO;
};

export type CreateAccountServiceResponseDTO = {
  account: AccountBase;
};
