import { Account } from 'src/account/domain/entity/account.entity';
import { CreateAccountDTO } from 'src/account/domain/entity/account.entity.types';

export type CreateAccountServiceParamsDTO = {
  data: CreateAccountDTO;
};

export type CreateAccountServiceResponseDTO = {
  account?: Account;
};
