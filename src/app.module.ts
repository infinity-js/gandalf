import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { gandalfConfigFile } from './config/config-file.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [gandalfConfigFile],
      expandVariables: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
