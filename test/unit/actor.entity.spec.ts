import { Actor } from 'src/actor/domain/entity/actor.entity';
import { faker } from '@faker-js/faker';
import { makeFakePermissionEntity } from './permission.entity.spec';
import { makeFakeRoleEntity } from './role.entity.spec';

export const makeFakeActorEntity = (): Actor => {
  return Actor.instantiate({
    id: faker.datatype.uuid(),
    permissions: Array.from({ length: faker.datatype.number(5) }, () =>
      makeFakePermissionEntity().toJSON(),
    ),
    roles: Array.from({ length: faker.datatype.number(5) }, () =>
      makeFakeRoleEntity().toJSON(),
    ),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  });
};

describe('Actor Entity', () => {
  let actor: Actor;

  describe('instantiate', () => {
    beforeEach(() => {
      actor = makeFakeActorEntity();
    });

    it('should instantiate a valid Actor', () => {
      expect(actor).toBeDefined();
    });

    describe('should throw an error when', () => {
      it('id is not provided', () => {
        expect(() => {
          Actor.instantiate({
            ...actor.toJSON(),
            id: undefined as any,
          });
        }).toThrowError('[{"field":"id","message":"id must be a string"}]');
      });

      it('permissions is not provided', () => {
        expect(() => {
          Actor.instantiate({
            ...actor.toJSON(),
            permissions: undefined as any,
          });
        }).toThrowError(
          '[{"field":"permissions","message":"permissions must be an array"}]',
        );
      });

      it('roles is not provided', () => {
        expect(() => {
          Actor.instantiate({
            ...actor.toJSON(),
            roles: undefined as any,
          });
        }).toThrowError(
          '[{"field":"roles","message":"roles must be an array"}]',
        );
      });

      it('createdAt is not provided', () => {
        expect(() => {
          Actor.instantiate({
            ...actor.toJSON(),
            createdAt: undefined as any,
          });
        }).toThrowError(
          '[{"field":"createdAt","message":"createdAt must be a valid ISO 8601 date string"}]',
        );
      });

      it('updatedAt is not provided', () => {
        expect(() => {
          Actor.instantiate({
            ...actor.toJSON(),
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
      actor = Actor.create({
        permissions: Array.from({ length: faker.datatype.number(5) }, () =>
          makeFakePermissionEntity().toJSON(),
        ),
        roles: Array.from({ length: faker.datatype.number(5) }, () =>
          makeFakeRoleEntity().toJSON(),
        ),
      });
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should create a valid Permission', () => {
      expect(actor).toBeDefined();
    });

    it('should create a Permission with a valid id', () => {
      expect(actor.id).toBeDefined();
    });

    it('should create a actor with createdAt and updatedAt', () => {
      expect(actor.createdAt.toISOString()).toBe(fakeDate);
      expect(actor.updatedAt.toISOString()).toBe(fakeDate);
    });
  });
});
