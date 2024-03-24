import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';
import { PushNotificationService } from 'src/notification/push-notification.service';
import { NotificationModule } from 'src/notification/notification.module';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    LoggerModule,
    SequelizeModule.forFeature([Category]),
    NotificationModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService], // Add UserService to the providers array
})
export class CategoryModule {}


