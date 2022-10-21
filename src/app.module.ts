import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { EchoModule } from './echo/echo.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "scam2.db",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    TelegrafModule.forRoot({
      token: process.env.ECHO_BOT_TOKEN,
      include: [EchoModule],
    }),
    EchoModule,
    ReportsModule,
  ],
})
export class AppModule { }
