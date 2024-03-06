import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

import { ProductController } from './product.controller';
import { Product } from './models/product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    LoggerModule,
    SequelizeModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService], // Add UserService to the providers array
})
export class ProductModule {}


