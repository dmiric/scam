import { UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  Help,
  InjectBot,
  On,
  Message,
  Start,
  Update,
  Command,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { EchoService } from './echo.service';
import { Context } from '../interfaces/context.interface';
import { ReverseTextPipe } from '../common/pipes/reverse-text.pipe';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { AdminGuard } from '../common/guards/admin.guard';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { RemoveCommandPipe } from './pipes/remove-command.pipe';
import { TransformToObjectPipe } from './pipes/tranform-to-object.pipe';
import { ValidationPipe } from 'reports/pipes/validation.pipe';
import { CreateReportDto } from 'reports/dto/create-report.dto';
import { ExtractHostNamePipe } from 'common/pipes/extract-host-name.pipe';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class EchoUpdate {
  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    private readonly echoService: EchoService,
  ) { }

  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    return `Hey, I'm ${me.first_name}`;
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }

  @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return 'Welcome judge';
  }

  @Command('ban')
  async onBanCommand(
    @Message('text',
      new RemoveCommandPipe(),
      new TransformToObjectPipe(),
      new ValidationPipe(),
      new ExtractHostNamePipe()
    ) report: CreateReportDto): Promise<string> {
    return await this.echoService.ban(report);
  }

  @On('text')
  onMessage(@Message('text', new ReverseTextPipe()) reversedText: string): string {
    return reversedText;
  }
}
