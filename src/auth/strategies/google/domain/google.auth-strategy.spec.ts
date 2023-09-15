import { faker } from '@faker-js/faker';
import { GoogleAuthStrategy } from './google.auth-strategy';
import { GoogleAuthStrategyData } from './google.auth-strategy.types';

describe('GoogleAuthStrategy', () => {
  describe('fromData', () => {
    it('should return an instance of GoogleAuthStrategy', () => {
      const googleAuthStrategy = GoogleAuthStrategy.fromData({
        accountId: faker.string.uuid(),
        googleId: faker.string.uuid(),
        email: faker.internet.email(),
      });

      expect(googleAuthStrategy).toBeInstanceOf(GoogleAuthStrategy);
    });
  });

  describe('getter methods', () => {
    let data: GoogleAuthStrategyData;

    beforeEach(() => {
      data = {
        accountId: faker.string.uuid(),
        googleId: faker.string.uuid(),
        email: faker.internet.email(),
      };
    });

    it('should return accountId when get accountId is called', () => {
      const googleAuthStrategy = GoogleAuthStrategy.fromData(data);

      expect(googleAuthStrategy.accountId).toEqual(data.accountId);
    });

    it('should return googleId when get googleId is called', () => {
      const googleAuthStrategy = GoogleAuthStrategy.fromData(data);

      expect(googleAuthStrategy.googleId).toEqual(data.googleId);
    });

    it('should return email when get email is called', () => {
      const googleAuthStrategy = GoogleAuthStrategy.fromData(data);

      expect(googleAuthStrategy.email).toEqual(data.email);
    });
  });
});
