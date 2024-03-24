import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

import { PushNotificationService } from 'src/notification/push-notification.service';
import { ExpoToken } from './model/token.model';
import { NotificationController } from './push-notification.controller';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    LoggerModule,
    SequelizeModule.forFeature([ExpoToken]),
  ],
  controllers: [NotificationController],
  providers: [ PushNotificationService], // Add UserService to the providers array
  exports:[PushNotificationService],
})
export class NotificationModule {}


