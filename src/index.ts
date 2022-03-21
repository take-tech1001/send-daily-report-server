import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';
import helmet from 'helmet';

const server = express();

const promiseApplicationReady = NestFactory.create(
  AppModule,
  new ExpressAdapter(server),
).then((app) => {
  app.use(helmet());
  app.enableCors();
  app.init();
});

export const api = functions
  .region('asia-northeast1')
  .https.onRequest(async (...args) => {
    await promiseApplicationReady;
    server(...args);
  });
