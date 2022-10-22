import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { isDefined, isEmpty } from 'class-validator'

@Injectable()
export class ExtractHostNamePipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!isDefined(value.host) || isEmpty(value.host)) {
      const url = new URL(value.url)
      value.host = url.hostname
    }
    return value;
  }

}
