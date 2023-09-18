import { faker } from '@faker-js/faker';
import { AccountBase } from './account.base.entity';
import { AccountData } from './account.base.entity.types';

describe('Account Entity (Unit)', () => {
  describe('create', () => {
    it('should create a new account', () => {
      const email = faker.internet.email();

      const account = AccountBase.create({ email });

      expect(account).toBeDefined();
      expect(account).toBeInstanceOf(AccountBase);

      expect(account.id).toBeDefined();
      expect(account.emails).toHaveLength(1);
      expect(account.emails[0].address).toBe(email);
    });
  });

  describe('fromData', () => {
    it('should create an account from data', () => {
      const account = new AccountBase({
        id: faker.string.uuid(),
        emails: [{ address: faker.internet.email(), isVerified: false }],
      });

      expect(account).toBeDefined();
      expect(account).toBeInstanceOf(AccountBase);
    });
  });

  describe('getters', () => {
    const accountData: AccountData = {
      id: faker.string.uuid(),
      emails: [{ address: faker.internet.email(), isVerified: false }],
    };

    const account = new AccountBase(accountData);

    it('should return the id', () => {
      expect(account.id).toBe(accountData.id);
    });

    it('should return the emails', () => {
      expect(account.emails).toEqual(accountData.emails);
    });
  });
});
