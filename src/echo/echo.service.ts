import { Injectable, UsePipes } from '@nestjs/common';
import { ReportsService } from '../reports/reports.service';
import { TransformToObjectPipe } from './pipes/tranform-to-object.pipe';
import { CreateReportDto } from 'reports/dto/create-report.dto';


@Injectable()
export class EchoService {

  constructor(private reportsService: ReportsService) { }

  @UsePipes(TransformToObjectPipe)
  async ban(reportDto: CreateReportDto): Promise<string> {
    console.log(reportDto)
    try {
      this.reportsService.create(reportDto);
      return "Thank you for the report."
    }
    catch {
      return "Failed to write to database. Please contact admin."
    }
  }
}
