/* eslint-disable @typescript-eslint/no-namespace */
import { Account } from '../account.service.entity';
import { CreateAccountServiceParamsDTO } from '../create/account.create.service.types';
import { GetAccountServiceParamsDTO } from '../get/account.get.service.types';

export namespace AccountService {
  export namespace GetOrCreate {
    export type Params = {
      get: GetAccountServiceParamsDTO;
      create: CreateAccountServiceParamsDTO;
    };

    export type Response = {
      account: Account;
      created: boolean;
    };
  }
}
