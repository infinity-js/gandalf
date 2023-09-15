import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule (unit)', () => {
  let appModule: AppModule;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appModule = app.get(AppModule);
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
