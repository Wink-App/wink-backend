import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Feedback } from './models/feedback.model';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';



@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    LoggerModule,
    SequelizeModule.forFeature([Feedback]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService], // Add UserService to the providers array
})
export class FeedbackModule {}


