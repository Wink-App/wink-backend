import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { User } from './models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Address } from './models/address.model';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    LoggerModule,
    SequelizeModule.forFeature([User, Address]),
  ],
  controllers: [UserController],
  providers: [UserService], // Add UserService to the providers array
})
export class UserModule {}


