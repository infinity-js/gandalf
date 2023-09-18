import { faker } from '@faker-js/faker';
import { AccountBase } from '../account.base.entity';

export const makeFakeAccount = (): AccountBase => {
  return new AccountBase({
    id: faker.string.uuid(),
    emails: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => {
      return {
        address: faker.internet.email(),
        isVerified: faker.datatype.boolean(),
      };
    }),
  });
};
