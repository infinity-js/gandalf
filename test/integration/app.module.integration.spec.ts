import { Test, TestingModule } from '@nestjs/testing';
import { ActorModule } from 'src/actor/actor.module';
import { AppModule } from 'src/app.module';
import { PermissionModule } from 'src/permission/permission.module';
import { RoleModule } from 'src/role/role.module';

describe('App Module', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    const module = appModule.get<AppModule>(AppModule);

    expect(module).toBeDefined();
  });

  it('should have a ActorModule', () => {
    const actorModule = appModule.get(ActorModule);

    expect(actorModule).toBeDefined();
  });

  it('should have a PermissionModule', () => {
    const permissionModule = appModule.get(PermissionModule);

    expect(permissionModule).toBeDefined();
  });

  it('should have a RoleModule', () => {
    const roleModule = appModule.get(RoleModule);

    expect(roleModule).toBeDefined();
  });
});
