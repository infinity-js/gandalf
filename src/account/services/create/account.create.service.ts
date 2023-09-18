import { Injectable } from '@nestjs/common';
import { AccountRepositoryService } from '../repository/account.repository.service';
import {
  CreateAccountServiceParamsDTO,
  CreateAccountServiceResponseDTO,
} from './account.create.service.types';
import { Account } from 'src/account/domain/entity/account.entity';

type Params = CreateAccountServiceParamsDTO;
type Response = CreateAccountServiceResponseDTO;

@Injectable()
export class CreateAccountService {
  constructor(
    private readonly accountRepositoryService: AccountRepositoryService,
  ) {}

  async execute(params: Params): Promise<Response> {
    await this.assertConstraints(params);

    const account = Account.create(params.data);

    await this.accountRepositoryService.create(account);

    return { account };
  }

  private async assertConstraints(params: Params): Promise<void> {
    const accountExistsWithEmail =
      await this.accountRepositoryService.getByEmail(params.data.email);

    if (accountExistsWithEmail) {
      throw new Error('Account already exists with this email');
    }
  }
}
