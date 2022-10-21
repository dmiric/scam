import { Module } from '@nestjs/common';
import { EchoUpdate } from './echo.update';
import { EchoService } from './echo.service';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [ReportsModule],
  providers: [EchoUpdate, EchoService],
})
export class EchoModule { }
