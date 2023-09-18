/* eslint-disable @typescript-eslint/no-namespace */
import { GoogleOAuthService } from './google-oauth.service';

export namespace GoogleOAuthService {
  export namespace VerifyCode {
    export type Params = {
      code: string;
    };
    export type Response = {
      email: string;
    };
  }
}
