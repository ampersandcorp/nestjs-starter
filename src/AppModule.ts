import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { AppController } from './app.controller';
import { TraceIdIssuanceMiddleware } from './shared/middlewares/TraceIdIssuanceMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.MYSQL.HOST,
      port: config.MYSQL.PORT,
      username: config.MYSQL.USER,
      password: config.MYSQL.PASSWORD,
      database: config.MYSQL.DATABASE,
      synchronize: false,
      entities: [
        __dirname + '/**/entities/*Entity{.ts,.js}',
        __dirname + '/**/entities/*View{.ts,.js}',
      ],
      charset: 'utf8mb4',
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TraceIdIssuanceMiddleware)
      .forRoutes('*');
  }
}
