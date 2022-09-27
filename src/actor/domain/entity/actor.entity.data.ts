import {
  IsArray,
  IsDateString,
  IsString,
  OmitType,
  Type,
  ValidateNested,
} from '@infinity-js/core';
import { PermissionData } from 'src/permission/domain/entity/permission.entity.data';
import { RoleData } from 'src/role/domain/entity/role.entity.data';

export class ActorData {
  @IsString()
  id!: string;

  @IsArray()
  @ValidateNested()
  @Type(() => PermissionData)
  permissions!: PermissionData[];

  @IsArray()
  @ValidateNested()
  @Type(() => RoleData)
  roles!: RoleData[];

  @IsDateString()
  createdAt!: string;

  @IsDateString()
  updatedAt!: string;
}

export class CreateActorDTO extends OmitType(ActorData, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
