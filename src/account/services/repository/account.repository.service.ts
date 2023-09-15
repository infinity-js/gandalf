import { Account } from 'src/account/domain/entity/account.entity';

export class AccountRepositoryService {
  async getByEmail(email: string): Promise<Account> {
    throw new Error(
      `AccountRepositoryService.getByEmail Not implemented: ${email}`,
    );
  }
}
