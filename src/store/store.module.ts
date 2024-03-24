import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { Store } from './models/store.model';
import { StoreCategory } from './models/store_categories.model';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    LoggerModule,
    SequelizeModule.forFeature([Store, StoreCategory]),
  ],
  controllers: [StoreController],
  providers: [StoreService], // Add UserService to the providers array
})
export class StoreModule {}


