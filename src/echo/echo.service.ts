import { Injectable } from '@nestjs/common';
import { ReportsService } from '../reports/reports.service';


@Injectable()
export class EchoService {

  constructor(private reportsService: ReportsService) { }

  async ban(text: string): Promise<string> {
    const match = text.match(/^\/([^\s]+)\s?(.+)?/);
    let url;
    if (match !== null) {
      if (match[2]) {
        url = match[2];
      }
    }

    const realUrl = new URL(url)

    if (realUrl) {
      // realUrl.hostname
      const report = await this.reportsService.findByHostname(realUrl.hostname)
      if (report) {
        return "already exists"
      }
    };

    return "Tnx."
  }
}
