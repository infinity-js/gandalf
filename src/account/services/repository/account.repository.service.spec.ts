import { Test } from '@nestjs/testing';
import { AccountRepositoryService } from './account.repository.service';
import { makeFakeAccount } from 'src/account/domain/entity/__tests__/account.make-fake';

describe('AccountRepositoryService (unit)', () => {
  let accountRepositoryService: AccountRepositoryService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [AccountRepositoryService],
    }).compile();

    accountRepositoryService = app.get(AccountRepositoryService);
  });

  describe('getByEmail', () => {
    it("should throw 'NotImplemented' error", () => {
      const fakeAccount = makeFakeAccount();

      expect(() =>
        accountRepositoryService.getByEmail('email'),
      ).rejects.toThrowError(
        'AccountRepositoryService.getByEmail Not implemented: email',
      );

      expect(async () => {
        await accountRepositoryService.create(fakeAccount);
      }).rejects.toThrowError(
        `AccountRepositoryService.create Not implemented: ${fakeAccount.id}`,
      );
    });

    it.todo("should call database to get account by 'email'");
    it.todo("should call database to create account with 'data'");
  });
});
