import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // await NestFactory.createApplicationContext(AppModule);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Scam2 API')
    .setDescription('Scam2 API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

}
bootstrap();
