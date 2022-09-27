import { uuidV4, validateEntity } from '@infinity-js/core';
import { CreatePermissionDTO, PermissionData } from './permission.entity.data';

export class Permission {
  private _id: string;
  private _name: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(params: PermissionData) {
    this._id = params.id;
    this._name = params.name;
    this._createdAt = new Date(params.createdAt);
    this._updatedAt = new Date(params.updatedAt);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(params: CreatePermissionDTO): Permission {
    validateEntity(CreatePermissionDTO, params);

    return new Permission({
      ...params,
      id: uuidV4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  static instantiate(params: PermissionData): Permission {
    validateEntity(PermissionData, params);

    return new Permission(params);
  }

  toJSON(): PermissionData {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
