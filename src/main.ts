import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  // const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}
bootstrap();
