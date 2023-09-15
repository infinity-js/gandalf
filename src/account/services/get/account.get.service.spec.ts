import { Test } from '@nestjs/testing';
import { GetAccountService } from './account.get.service';
import { AccountRepositoryService } from '../repository/account.repository.service';
import { faker } from '@faker-js/faker';
import { makeFakeAccount } from 'src/account/domain/entity/__tests__/account.make-fake';

describe('GetAccountService (unit)', () => {
  let accountRepositoryService: {
    getByEmail: jest.Mock<any, any, any>;
  };

  let getAccountService: GetAccountService;

  beforeEach(async () => {
    accountRepositoryService = {
      getByEmail: jest.fn(),
    };

    const app = await Test.createTestingModule({
      providers: [GetAccountService, AccountRepositoryService],
    })
      .overrideProvider(AccountRepositoryService)
      .useValue(accountRepositoryService)
      .compile();

    getAccountService = app.get(GetAccountService);
  });

  describe('get by email', () => {
    it("should call accountRepositoryService.getByEmail with 'email'", async () => {
      const email = faker.internet.email();
      await getAccountService.execute({ by: { email } });

      expect(accountRepositoryService.getByEmail).toHaveBeenCalledWith(email);
    });

    it("should return accountRepositoryService.getByEmail's response", async () => {
      const account = makeFakeAccount();
      accountRepositoryService.getByEmail.mockResolvedValueOnce(account);

      const response = await getAccountService.execute({
        by: { email: faker.internet.email() },
      });

      expect(response).toEqual({ account });
    });
  });
});
