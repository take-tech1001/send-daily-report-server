import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import type { OauthV2AccessResponse } from '@slack/web-api';
import { config } from 'firebase-functions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getToken(
    @Req() request: Request,
  ): Promise<OauthV2AccessResponse | string> {
    const code = request.query.code as string | undefined;
    const error = request.query.error as string | undefined;
    const firebaseConfig = config();
    const env = firebaseConfig['send-daily-report-e1ce9'];
    const clientId = env.client_id;
    const clientSecret = env.client_secret;

    return this.appService.getToken(code, error, clientId, clientSecret);
  }
}
