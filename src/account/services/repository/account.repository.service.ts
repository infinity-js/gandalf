import { AccountBase } from 'src/account/domain/entity/account.base.entity';

export class AccountRepositoryService {
  async getByEmail(email: string): Promise<AccountBase> {
    throw new Error(
      `AccountRepositoryService.getByEmail Not implemented: ${email}`,
    );
  }

  async create(account: AccountBase): Promise<void> {
    throw new Error(
      `AccountRepositoryService.create Not implemented: ${account.id}`,
    );
  }
}
