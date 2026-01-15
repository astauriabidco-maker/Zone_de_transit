import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, ClientModule],
})
export class AppModule { }