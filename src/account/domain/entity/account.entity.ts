import { ulid } from 'ulid';
import {
  AccountData,
  AccountEmail,
  CreateAccountDTO,
} from './account.entity.types';

export class Account {
  #data: AccountData;

  private constructor(data: AccountData) {
    this.#data = data;
  }

  static fromData(data: AccountData): Account {
    return new Account(data);
  }

  static create(data: CreateAccountDTO): Account {
    return new Account({
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
