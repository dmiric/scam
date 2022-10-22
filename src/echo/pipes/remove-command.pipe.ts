import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class RemoveCommandPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // remove telegram command such as /ban from the beggining
    // and pass a string that comes after
    const match = value.match(/^\/([^\s]+)\s?(.+)?/);
    if (match !== null) {
      if (match[2]) {
        return match[2];
      }
    }

    return ''
  }

}
