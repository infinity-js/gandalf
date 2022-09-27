import {
  IsArray,
  IsDateString,
  IsString,
  OmitType,
  Type,
  ValidateNested,
} from '@infinity-js/core';

import { PermissionData } from 'src/permission/domain/entity/permission.entity.data';

export class RoleData {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsArray()
  @ValidateNested()
  @Type(() => PermissionData)
  permissions!: PermissionData[];

  @IsDateString()
  createdAt!: string;

  @IsDateString()
  updatedAt!: string;
}

export class CreateRoleDTO extends OmitType(RoleData, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
