import { Injectable } from '@nestjs/common';
import { AccountService as Types } from 'src/account/services/account/account.service.types';
import { GetAccountService } from '../get/account.get.service';
import { CreateAccountService } from '../create/account.create.service';
import { AccountBase } from '../../domain/entity/account.base.entity';
import { Account } from '../account.service.entity';

@Injectable()
export class AccountService {
  constructor(
    private readonly getAccountService: GetAccountService,
    private readonly createAccountService: CreateAccountService,
  ) {}

  async getOrCreate(
    params: Types.GetOrCreate.Params,
  ): Promise<Types.GetOrCreate.Response> {
    const { get, create } = params;

    let created: boolean = false;
    let account: AccountBase;

    const { account: foundAccount } = await this.getAccountService.execute(get);

    if (foundAccount) {
      account = foundAccount;
    } else {
      const { account: createdAccount } =
        await this.createAccountService.execute(create);
      created = true;
      account = createdAccount;
    }

    const accountServiceEntity = new Account(account, this);

    return { created, account: accountServiceEntity };
  }
}
