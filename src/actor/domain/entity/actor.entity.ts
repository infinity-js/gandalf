import { uuidV4, validateEntity } from '@infinity-js/core';
import { ActorData, CreateActorDTO } from './actor.entity.data';
import { Permission } from 'src/permission/domain/entity/permission.entity';
import { Role } from 'src/role/domain/entity/role.entity';

export class Actor {
  private _id: string;
  private _permissions: Permission[];
  private _roles: Role[];
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(params: ActorData) {
    this._id = params.id;
    this._permissions = params.permissions.map(Permission.instantiate);
    this._roles = params.roles.map(Role.instantiate);
    this._createdAt = new Date(params.createdAt);
    this._updatedAt = new Date(params.updatedAt);
  }

  get id(): string {
    return this._id;
  }

  get permissions(): Permission[] {
    return this._permissions;
  }

  get roles(): Role[] {
    return this._roles;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(params: CreateActorDTO): Actor {
    validateEntity(CreateActorDTO, params);

    return new Actor({
      ...params,
      id: uuidV4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  static instantiate(params: ActorData): Actor {
    validateEntity(ActorData, params);

    return new Actor(params);
  }

  toJSON(): ActorData {
    return {
      id: this.id,
      permissions: this.permissions.map((permission) => permission.toJSON()),
      roles: this.roles.map((role) => role.toJSON()),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
