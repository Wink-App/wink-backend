import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from './models/order.model';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Tracking } from './models/tracking.model';
import { NotificationModule } from 'src/notification/notification.module';



@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    LoggerModule,
    SequelizeModule.forFeature([Order, Tracking]),
    NotificationModule,
  ],
  controllers: [OrderController],
  providers: [OrderService], // Add UserService to the providers array
})
export class orderModule {}


