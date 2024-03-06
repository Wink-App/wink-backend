import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          safe: true,
          transport: {
            target: 'pino-pretty',
            options: {
              levelFirst: true,
              messageKey: 'message',
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
              messageFormat: true,
              singleLine: true,
              timestamp: `,"time":"${new Date(Date.now())}}"`,
              colorize: true,
            },
          },
          level:
            configService.get<string>('NODE_ENV') !== 'production'
              ? 'debug'
              : 'info',
        },
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useFactory: async (
        configService: ConfigService,
        logger: PinoLogger,
      ): Promise<SequelizeModuleOptions> => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadModels: true,
        logging: logger.info.bind(logger),
        typeValidation: true,
        benchmark: true,
        synchronize: configService.get<boolean>('DB_SYNC'),
        define: {
          timestamps: true,
          underscored: true,
          version: true,
          schema: 'public',
        },
      }),
      inject: [ConfigService, PinoLogger],
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    StoreModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Add ValidationPipe as a global pipe
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      // Optionally set options
      // useValue: {
      //   transform: true,
      //   skipMissingProperties: false,
      // },
    },
  ],
})
export class AppModule {}
