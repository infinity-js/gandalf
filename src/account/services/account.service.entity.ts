import { AccountBase } from '../domain/entity/account.base.entity';
import { AccountService } from './account/account.service';

export class Account extends AccountBase {
  #service: AccountService;

  constructor(account: AccountBase, service: AccountService) {
    super(account);
    this.#service = service;
  }
}
