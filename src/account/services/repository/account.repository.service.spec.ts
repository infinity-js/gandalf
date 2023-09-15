import { Test } from '@nestjs/testing';
import { AccountRepositoryService } from './account.repository.service';

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
      expect(() =>
        accountRepositoryService.getByEmail('email'),
      ).rejects.toThrowError(
        'AccountRepositoryService.getByEmail Not implemented: email',
      );
    });

    it.todo("should call database to get account by 'email'");
  });
});
