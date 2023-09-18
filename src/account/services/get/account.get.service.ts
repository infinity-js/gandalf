import { Injectable } from '@nestjs/common';
import { AccountRepositoryService } from '../repository/account.repository.service';
import {
  GetAccountServiceParamsDTO,
  GetAccountServiceResponseDTO,
} from './account.get.service.types';
import { AccountBase } from 'src/account/domain/entity/account.base.entity';

type Params = GetAccountServiceParamsDTO;
type Response = GetAccountServiceResponseDTO;

@Injectable()
export class GetAccountService {
  constructor(
    private readonly accountRepositoryService: AccountRepositoryService,
  ) {}

  async execute(params: Params): Promise<Response> {
    const account = await this.getAccount(params);

    return { account };
  }

  private async getAccount(params: Params): Promise<AccountBase | undefined> {
    if (params.by.email) {
      const account = await this.accountRepositoryService.getByEmail(
        params.by.email,
      );

      return account;
    }
  }
}
