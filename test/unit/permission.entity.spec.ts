import { faker } from '@faker-js/faker';
import { Permission } from '../../src/permission/domain/entity/permission.entity';

export const makeFakePermissionEntity = (): Permission => {
  return Permission.instantiate({
    id: faker.datatype.uuid(),
    name: `${faker.internet.userName()}.${faker.database.collation()}.${faker.internet.httpMethod()}`,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  });
};

describe('Permission Entity', () => {
  let permission: Permission;

  describe('instantiate', () => {
    beforeEach(() => {
      permission = makeFakePermissionEntity();
    });

    it('should instantiate a valid Permission', () => {
      expect(permission).toBeDefined();
    });

    describe('should throw an error when', () => {
      it('id is not provided', () => {
        expect(() => {
          Permission.instantiate({
            ...permission.toJSON(),
            id: undefined as any,
          });
        }).toThrowError('[{"field":"id","message":"id must be a string"}]');
      });

      it('name is not provided', () => {
        expect(() => {
          Permission.instantiate({
            ...permission.toJSON(),
            name: undefined as any,
          });
        }).toThrowError('[{"field":"name","message":"name must be a string"}]');
      });

      it('createdAt is not provided', () => {
        expect(() => {
          Permission.instantiate({
            ...permission.toJSON(),
            createdAt: undefined as any,
          });
        }).toThrowError(
          '[{"field":"createdAt","message":"createdAt must be a valid ISO 8601 date string"}]',
        );
      });

      it('updatedAt is not provided', () => {
        expect(() => {
          Permission.instantiate({
            ...permission.toJSON(),
            updatedAt: undefined as any,
          });
        }).toThrowError(
          '[{"field":"updatedAt","message":"updatedAt must be a valid ISO 8601 date string"}]',
        );
      });
    });
  });

  describe('create', () => {
    const fakeDate = faker.date.past().toISOString();

    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(fakeDate));
    });

    beforeEach(() => {
      permission = Permission.create({
        name: makeFakePermissionEntity().name,
      });
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should create a valid Permission', () => {
      expect(permission).toBeDefined();
    });

    it('should create a Permission with a valid id', () => {
      expect(permission.id).toBeDefined();
    });

    it('should create a permission with createdAt and updatedAt', () => {
      expect(permission.createdAt.toISOString()).toBe(fakeDate);
      expect(permission.updatedAt.toISOString()).toBe(fakeDate);
    });
  });
});
