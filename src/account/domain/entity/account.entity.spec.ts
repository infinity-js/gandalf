import { faker } from '@faker-js/faker';
import { Account } from './account.entity';
import { AccountData } from './account.entity.types';

describe('Account Entity (Unit)', () => {
  describe('create', () => {
    it('should create a new account', () => {
      const email = faker.internet.email();

      const account = Account.create({ email });

      expect(account).toBeDefined();
      expect(account).toBeInstanceOf(Account);

      expect(account.id).toBeDefined();
      expect(account.emails).toHaveLength(1);
      expect(account.emails[0].address).toBe(email);
    });
  });

  describe('fromData', () => {
    it('should create an account from data', () => {
      const account = Account.fromData({
        id: faker.string.uuid(),
        emails: [{ address: faker.internet.email(), isVerified: false }],
      });

      expect(account).toBeDefined();
      expect(account).toBeInstanceOf(Account);
    });
  });

  describe('getters', () => {
    const accountData: AccountData = {
      id: faker.string.uuid(),
      emails: [{ address: faker.internet.email(), isVerified: false }],
    };

    const account = Account.fromData(accountData);

    it('should return the id', () => {
      expect(account.id).toBe(accountData.id);
    });

    it('should return the emails', () => {
      expect(account.emails).toEqual(accountData.emails);
    });
  });
});
