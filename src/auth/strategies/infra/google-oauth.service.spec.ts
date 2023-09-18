const mockedAuthClient = {
  getToken: jest.fn(),
  setCredentials: jest.fn(),
};

const mockedOAuth2 = {
  userinfo: {
    get: jest.fn(),
  },
};

const mockedGoogle = {
  auth: {
    OAuth2: jest.fn().mockImplementation(() => mockedAuthClient),
  },
  oauth2: jest.fn().mockImplementation(() => mockedOAuth2),
};

jest.mock('googleapis', () => ({
  google: mockedGoogle,
}));

import { Test } from '@nestjs/testing';
import { GoogleOAuthService } from './google-oauth.service';
import { ConfigService } from '@nestjs/config';
import { faker } from '@faker-js/faker';

describe('GoogleOauthService (Unit)', () => {
  let googleOauthService: GoogleOAuthService;
  let configService: {
    get: jest.Mock<any, any>;
  };
  let googleClientId: string;
  let googleClientSecret: string;

  beforeEach(async () => {
    googleClientId = faker.string.uuid();
    googleClientSecret = faker.string.uuid();

    configService = {
      get: jest.fn(),
    };
  });

  describe('Service is enabled', () => {
    let userInfo: {
      email: string;
    };

    const mockedTokens = 'any_token';

    beforeEach(async () => {
      userInfo = {
        email: faker.internet.email(),
      };

      mockedAuthClient.getToken.mockResolvedValue({
        tokens: mockedTokens,
      });

      mockedOAuth2.userinfo.get.mockResolvedValue({
        data: userInfo,
      });

      configService.get.mockReturnValue({
        google_oauth: {
          client_id: googleClientId,
          client_secret: googleClientSecret,
        },
      });

      const app = await Test.createTestingModule({
        providers: [GoogleOAuthService, ConfigService],
      })
        .overrideProvider(ConfigService)
        .useValue(configService)
        .compile();

      googleOauthService = app.get(GoogleOAuthService);
    });

    describe('verifyCode', () => {
      it("should call google's auth.OAuth2 with the correct params", async () => {
        const code = faker.string.uuid();

        await googleOauthService.verifyCode({ code });

        expect(mockedGoogle.auth.OAuth2).toHaveBeenCalledWith(
          googleClientId,
          googleClientSecret,
          'postmessage',
        );
      });

      it("should call google's authClient.getToken with the correct params", async () => {
        const code = faker.string.uuid();

        await googleOauthService.verifyCode({ code });

        expect(mockedAuthClient.getToken).toHaveBeenCalledWith(code);
      });

      it("should call google's authClient.setCredentials with the correct params", async () => {
        const code = faker.string.uuid();

        await googleOauthService.verifyCode({ code });

        expect(mockedAuthClient.setCredentials).toHaveBeenCalledWith(
          mockedTokens,
        );
      });

      it('should call google.oauth2 with the correct params', async () => {
        const code = faker.string.uuid();

        await googleOauthService.verifyCode({ code });

        expect(mockedGoogle.oauth2).toHaveBeenCalledWith({
          auth: mockedAuthClient,
          version: 'v2',
        });
      });

      it("should call google's oauth2.userinfo.get ", async () => {
        const code = faker.string.uuid();

        await googleOauthService.verifyCode({ code });

        expect(mockedOAuth2.userinfo.get).toHaveBeenCalled();
      });

      it('should return the user email', async () => {
        const code = faker.string.uuid();

        const response = await googleOauthService.verifyCode({ code });

        expect(response).toEqual({
          email: userInfo.email,
        });
      });

      it('should throw an error if the user email is not returned', async () => {
        const code = faker.string.uuid();

        mockedOAuth2.userinfo.get.mockResolvedValueOnce({
          data: {},
        });

        await expect(
          googleOauthService.verifyCode({ code }),
        ).rejects.toThrowError('Missing email from google account');
      });
    });
  });

  describe('Service is disabled', () => {
    beforeEach(async () => {
      configService.get.mockReturnValue({});

      const app = await Test.createTestingModule({
        providers: [GoogleOAuthService, ConfigService],
      })
        .overrideProvider(ConfigService)
        .useValue(configService)
        .compile();

      googleOauthService = app.get(GoogleOAuthService);
    });

    describe('verifyCode', () => {
      it('should throw an error', async () => {
        const code = faker.string.uuid();

        await expect(
          googleOauthService.verifyCode({ code }),
        ).rejects.toThrowError('Google OAuth is not enabled');
      });
    });
  });
});
