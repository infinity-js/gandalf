import { uuidV4, validateEntity } from '@infinity-js/core';
import { Permission } from 'src/permission/domain/entity/permission.entity';
import { CreateRoleDTO, RoleData } from './role.entity.data';

export class Role {
  private _id: string;
  private _name: string;
  private _permissions: Permission[];
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(params: RoleData) {
    this._id = params.id;
    this._name = params.name;

    this._permissions = params.permissions.map(Permission.instantiate);

    this._createdAt = new Date(params.createdAt);
    this._updatedAt = new Date(params.updatedAt);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get permissions(): Permission[] {
    return this._permissions;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(params: CreateRoleDTO): Role {
    validateEntity(CreateRoleDTO, params);

    return new Role({
      ...params,
      id: uuidV4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  static instantiate(params: RoleData): Role {
    validateEntity(RoleData, params);

    return new Role(params);
  }

  toJSON(): RoleData {
    return {
      id: this.id,
      name: this.name,
      permissions: this.permissions.map((permission) => permission.toJSON()),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
