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
        return "We already know about this domain we are trying to remove the site from the internet."
      }

      this.reportsService.create({ 'raw': url, 'host': realUrl.hostname })

    };

    return "Thank you for reporting this site. We will do everything in our power to remove this treat from the internet."
  }
}
