import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ActorModule } from './actor/actor.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'api-docs'),
      serveRoot: '/api-docs',
    }),
    ActorModule,
    PermissionModule,
    RoleModule,
  ],
})
export class AppModule {}
