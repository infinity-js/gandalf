import { AccountData } from './account.entity.types';

export class Account {
  #data: AccountData;

  private constructor(data: AccountData) {
    this.#data = data;
  }

  static fromData(data: AccountData): Account {
    return new Account(data);
  }
}
