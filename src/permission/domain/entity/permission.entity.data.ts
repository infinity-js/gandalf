import { IsDateString, IsString, OmitType } from '@infinity-js/core';

export class PermissionData {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsDateString()
  createdAt!: string;

  @IsDateString()
  updatedAt!: string;
}

export class CreatePermissionDTO extends OmitType(PermissionData, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
