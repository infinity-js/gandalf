import { faker } from '@faker-js/faker';
import { Account } from '../account.entity';

export const makeFakeAccount = (): Account => {
  return Account.fromData({
    id: faker.string.uuid(),
    emails: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => {
      return {
        address: faker.internet.email(),
        isVerified: faker.datatype.boolean(),
      };
    }),
  });
};
