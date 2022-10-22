import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class PlainToReportPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    return object;
  }

}
