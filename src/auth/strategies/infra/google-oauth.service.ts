import { ConfigService } from '@nestjs/config';
import { GoogleOAuthService as Types } from './google-oauth.service.types';
import { google } from 'googleapis';
import { GandalfConfigSchema } from 'src/config/config-file.validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleOAuthService {
  #isEnabled: boolean;
  #clientId: string;
  #clientSecret: string;

  constructor(configService: ConfigService<GandalfConfigSchema, true>) {
    const integrations =
      configService.get<GandalfConfigSchema['integrations']>('integrations');

    if (!integrations?.google_oauth) {
      this.#isEnabled = false;
      this.#clientId = '';
      this.#clientSecret = '';
      return;
    }

    this.#isEnabled = true;
    this.#clientId = integrations.google_oauth.client_id;
    this.#clientSecret = integrations.google_oauth.client_secret;
  }

  async isEnabled(): Promise<boolean> {
    return this.#isEnabled;
  }

  async verifyCode(
    params: Types.VerifyCode.Params,
  ): Promise<Types.VerifyCode.Response> {
    const authClient = new google.auth.OAuth2(
      this.#clientId,
      this.#clientSecret,
      'postmessage',
    );

    const { tokens } = await authClient.getToken(params.code);

    authClient.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: authClient,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email) throw new Error('Missing email from google account');

    return {
      email: data.email,
    };
  }
}
