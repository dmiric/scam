import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>
  ) { }

  create(createReportDto: CreateReportDto): Promise<Report> {
    const report = new Report();
    report.raw = createReportDto.raw;
    report.host = createReportDto.host;
    return this.reportRepository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return this.reportRepository.find();
  }

  findOne(id: number): Promise<Report> {
    return this.reportRepository.findOneBy({ id: id });
  }

  async findByHostname(hostname: string): Promise<Report> {
    return await this.reportRepository.findOneBy({ host: hostname })
  }

  async remove(id: number): Promise<void> {
    await this.reportRepository.delete(id);
  }
}
