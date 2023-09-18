import { Test } from '@nestjs/testing';
import { AccountService } from './account.service';
import { GetAccountService } from '../get/account.get.service';
import { CreateAccountService } from '../create/account.create.service';
import { faker } from '@faker-js/faker';
import { makeFakeAccount } from 'src/account/domain/entity/__tests__/account.make-fake';
import { Account } from '../account.service.entity';
import { AccountRepositoryService } from '../repository/account.repository.service';

describe('Account Service (Unit)', () => {
  let accountService: AccountService;
  let getAccountService: {
    execute: jest.Mock<any, any>;
  };
  let createAccountService: {
    execute: jest.Mock<any, any>;
  };

  beforeEach(async () => {
    getAccountService = {
      execute: jest.fn(),
    };

    createAccountService = {
      execute: jest.fn(),
    };

    const app = await Test.createTestingModule({
      providers: [
        AccountService,
        GetAccountService,
        CreateAccountService,
        AccountRepositoryService,
      ],
    })
      .overrideProvider(GetAccountService)
      .useValue(getAccountService)
      .overrideProvider(CreateAccountService)
      .useValue(createAccountService)
      .compile();

    accountService = app.get(AccountService);
  });

  describe('GetOrCreate', () => {
    it('should call getAccountService.execute with the correct params', async () => {
      const email = faker.internet.email();

      const params = {
        get: { by: { email } },
        create: { data: { email } },
      };

      const fakeAccount = makeFakeAccount();

      getAccountService.execute.mockResolvedValueOnce({ account: fakeAccount });

      await accountService.getOrCreate(params);

      expect(getAccountService.execute).toHaveBeenCalledWith(params.get);
    });

    it('should call createAccountService.execute with the correct params', async () => {
      const email = faker.internet.email();

      const params = {
        get: { by: { email } },
        create: { data: { email } },
      };

      const fakeAccount = makeFakeAccount();

      getAccountService.execute.mockResolvedValueOnce({ account: null });

      createAccountService.execute.mockResolvedValueOnce({
        account: fakeAccount,
      });

      await accountService.getOrCreate(params);

      expect(createAccountService.execute).toHaveBeenCalledWith(params.create);
    });

    it('should return the account from getAccountService.execute', async () => {
      const email = faker.internet.email();

      const params = {
        get: { by: { email } },
        create: { data: { email } },
      };

      const fakeAccount = makeFakeAccount();

      getAccountService.execute.mockResolvedValueOnce({ account: fakeAccount });

      const { account } = await accountService.getOrCreate(params);

      expect(account.id).toBe(fakeAccount.id);
      expect(account).toBeInstanceOf(Account);
    });

    it('should return the account from createAccountService.execute', async () => {
      const email = faker.internet.email();

      const params = {
        get: { by: { email } },
        create: { data: { email } },
      };

      const fakeAccount = makeFakeAccount();

      getAccountService.execute.mockResolvedValueOnce({ account: null });

      createAccountService.execute.mockResolvedValueOnce({
        account: fakeAccount,
      });

      const { account } = await accountService.getOrCreate(params);

      expect(account.id).toBe(fakeAccount.id);
      expect(account).toBeInstanceOf(Account);
    });
  });
});
