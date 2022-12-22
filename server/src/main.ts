import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

// configs
const port = process.env.PORT ?? 3000;
const sessionConfig = {
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // middlewares
  app.use(session(sessionConfig));
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  await app.listen(port);
}
bootstrap();
