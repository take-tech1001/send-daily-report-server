import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import type { OauthV2AccessResponse } from '@slack/web-api';

@Injectable()
export class AppService {
  async getToken(
    code: string | undefined,
    error: string | undefined,
    clientId: string,
    clientSecret: string,
  ): Promise<OauthV2AccessResponse | string> {
    if (code) {
      const slack = new WebClient();
      const result = await slack.oauth.v2.access({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      });
      return `access_token: ${result.authed_user.access_token}`;
    } else if (error) {
      return '認証がキャンセルされました。';
    }
  }
}
