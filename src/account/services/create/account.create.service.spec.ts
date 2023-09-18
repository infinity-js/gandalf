import { Test } from '@nestjs/testing';
import { CreateAccountService } from './account.create.service';
import { AccountRepositoryService } from '../repository/account.repository.service';
import { makeFakeAccount } from 'src/account/domain/entity/__tests__/account.make-fake';
import { CreateAccountServiceParamsDTO } from './account.create.service.types';
import { faker } from '@faker-js/faker';
import { Account } from 'src/account/domain/entity/account.entity';

describe('CreateAccountService (unit)', () => {
  let accountRepositoryService: {
    getByEmail: jest.Mock<any, any, any>;
    create: jest.Mock<any, any, any>;
  };

  let createAccountService: CreateAccountService;

  beforeEach(async () => {
    accountRepositoryService = {
      getByEmail: jest.fn(),
      create: jest.fn(),
    };

    const app = await Test.createTestingModule({
      providers: [CreateAccountService, AccountRepositoryService],
    })
      .overrideProvider(AccountRepositoryService)
      .useValue(accountRepositoryService)
      .compile();

    createAccountService = app.get(CreateAccountService);
  });

  describe('Assert Constraints', () => {
    it('should throw if account already exists with email', async () => {
      const accountToReturnFromRepository = makeFakeAccount();
      accountRepositoryService.getByEmail.mockResolvedValueOnce(
        accountToReturnFromRepository,
      );

      await expect(
        createAccountService.execute({
          data: {
            email: 'any_email',
          },
        }),
      ).rejects.toThrowError('Account already exists with this email');
    });
  });

  describe("Constraints don't fail", () => {
    it('should call Account.create with the correct data', async () => {
      const params: CreateAccountServiceParamsDTO = {
        data: { email: faker.internet.email() },
      };

      const spy = jest.spyOn(Account, 'create');
      await createAccountService.execute(params);

      expect(spy).toHaveBeenCalledWith(params.data);
      spy.mockRestore();
    });

    it("should call AccountRepositoryService.create with the account returned from Account.create's call", async () => {
      const accountToReturnFromAccountCreate = makeFakeAccount();
      jest
        .spyOn(Account, 'create')
        .mockReturnValueOnce(accountToReturnFromAccountCreate);

      await createAccountService.execute({
        data: { email: faker.internet.email() },
      });

      expect(accountRepositoryService.create).toHaveBeenCalledWith(
        accountToReturnFromAccountCreate,
      );
    });
  });
});
