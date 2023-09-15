import { faker } from '@faker-js/faker';
import { AuthStrategy } from './auth-strategy.entity';
import { GoogleAuthStrategy } from 'src/auth/strategies/google/domain/google.auth-strategy';
import { AuthStrategyType } from './auth-strategy.entity.types';

describe('AuthStrategyEntity (unit)', () => {
  describe('fromData', () => {
    it('should create an instance of AuthStrategy', () => {
      const authStrategy = AuthStrategy.fromData({
        type: AuthStrategyType.google,
        data: {
          email: faker.internet.email(),
          googleId: faker.string.uuid(),
          accountId: faker.string.uuid(),
        },
      });

      expect(authStrategy).toBeInstanceOf(AuthStrategy);
    });

    it("should throw an error when the type doesn't exist", () => {
      expect(() =>
        AuthStrategy.fromData({
          type: 'invalid' as any,
          data: {
            email: faker.internet.email(),
            googleId: faker.string.uuid(),
            accountId: faker.string.uuid(),
          },
        }),
      ).toThrowError('Invalid auth strategy type');
    });
  });

  describe('getData', () => {
    it('should return the data passed to the constructor', () => {
      const data = {
        type: AuthStrategyType.google,
        data: {
          email: faker.internet.email(),
          googleId: faker.string.uuid(),
          accountId: faker.string.uuid(),
        },
      };

      const authStrategy = AuthStrategy.fromData(data);

      expect(authStrategy.getData()).toEqual(data);
    });
  });

  describe('GoogleAuthStrategy', () => {
    it('should return true when isGoogle is called', () => {
      const authStrategy = AuthStrategy.fromData({
        type: AuthStrategyType.google,
        data: {
          email: faker.internet.email(),
          googleId: faker.string.uuid(),
          accountId: faker.string.uuid(),
        },
      });

      expect(authStrategy.isGoogle()).toBe(true);
    });

    it('should create an instance of GoogleAuthStrategy when toGoogle is called', () => {
      const authStrategy = AuthStrategy.fromData({
        type: AuthStrategyType.google,
        data: {
          email: faker.internet.email(),
          googleId: faker.string.uuid(),
          accountId: faker.string.uuid(),
        },
      });

      if (authStrategy.isGoogle()) {
        expect(authStrategy.toGoogle()).toBeInstanceOf(GoogleAuthStrategy);
      }
    });
  });
});
