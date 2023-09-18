import { ulid } from 'ulid';
import {
  AccountData,
  AccountEmail,
  CreateAccountDTO,
} from './account.base.entity.types';

export class AccountBase {
  #data: AccountData;

  constructor(data: AccountData) {
    this.#data = data;
  }

  static create(data: CreateAccountDTO): AccountBase {
    return new AccountBase({
      id: ulid(),
      emails: [{ address: data.email, isVerified: false }],
    });
  }

  get id(): string {
    return this.#data.id;
  }

  get emails(): AccountEmail[] {
    return this.#data.emails;
  }
}
