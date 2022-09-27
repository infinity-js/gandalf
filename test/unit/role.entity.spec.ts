import { faker } from '@faker-js/faker';
import { Role } from 'src/role/domain/entity/role.entity';
import { makeFakePermissionEntity } from './permission.entity.spec';

export const makeFakeRoleEntity = (): Role => {
  return Role.instantiate({
    id: faker.datatype.uuid(),
    name: `${faker.internet.userName()}.${faker.database.collation()}`,
    permissions: Array.from({ length: faker.datatype.number(5) }, () =>
      makeFakePermissionEntity().toJSON(),
    ),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  });
};

describe('Role Entity', () => {
  let role: Role;

  describe('instantiate', () => {
    beforeEach(() => {
      role = makeFakeRoleEntity();
    });

    it('should instantiate a valid Role', () => {
      expect(role).toBeDefined();
    });

    describe('should throw an error when', () => {
      it('id is not provided', () => {
        expect(() => {
          Role.instantiate({
            ...role.toJSON(),
            id: undefined as any,
          });
        }).toThrowError('[{"field":"id","message":"id must be a string"}]');
      });

      it('name is not provided', () => {
        expect(() => {
          Role.instantiate({
            ...role.toJSON(),
            name: undefined as any,
          });
        }).toThrowError('[{"field":"name","message":"name must be a string"}]');
      });

      it('permissions is not provided', () => {
        expect(() => {
          Role.instantiate({
            ...role.toJSON(),
            permissions: undefined as any,
          });
        }).toThrowError(
          '[{"field":"permissions","message":"permissions must be an array"}]',
        );
      });

      it('createdAt is not provided', () => {
        expect(() => {
          Role.instantiate({
            ...role.toJSON(),
            createdAt: undefined as any,
          });
        }).toThrowError(
          '[{"field":"createdAt","message":"createdAt must be a valid ISO 8601 date string"}]',
        );
      });

      it('updatedAt is not provided', () => {
        expect(() => {
          Role.instantiate({
            ...role.toJSON(),
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
      role = Role.create({
        name: makeFakeRoleEntity().name,
        permissions: makeFakeRoleEntity().permissions.map((permission) =>
          permission.toJSON(),
        ),
      });
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should create a valid Role', () => {
      expect(role).toBeDefined();
    });

    it('should create a Role with a valid id', () => {
      expect(role.id).toBeDefined();
    });

    it('should create a Role with createdAt and updatedAt', () => {
      expect(role.createdAt.toISOString()).toBe(fakeDate);
      expect(role.updatedAt.toISOString()).toBe(fakeDate);
    });
  });
});
