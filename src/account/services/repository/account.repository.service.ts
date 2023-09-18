import { Account } from 'src/account/domain/entity/account.entity';

export class AccountRepositoryService {
  async getByEmail(email: string): Promise<Account> {
    throw new Error(
      `AccountRepositoryService.getByEmail Not implemented: ${email}`,
    );
  }

  async create(account: Account): Promise<void> {
    throw new Error(
      `AccountRepositoryService.create Not implemented: ${account.id}`,
    );
  }
}
