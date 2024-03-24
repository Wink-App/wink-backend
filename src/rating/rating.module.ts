import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { Rating } from './models/rating.model';




@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    LoggerModule,
    SequelizeModule.forFeature([Rating]),
  ],
  controllers: [RatingController],
  providers: [RatingService], // Add UserService to the providers array
})
export class RatingModule {}


