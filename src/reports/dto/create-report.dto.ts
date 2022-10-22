import { IsUrl, IsFQDN, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsFQDN()
  host?: string;
}
