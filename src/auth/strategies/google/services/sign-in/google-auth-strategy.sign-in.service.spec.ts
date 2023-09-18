import { AccountService } from 'src/account/services/account/account.service';
import { GoogleAuthStrategySignInService } from './google-auth-strategy.sign-in.service';
import { GoogleOAuthService } from 'src/auth/strategies/infra/google-oauth.service';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { makeFakeAccount } from 'src/account/domain/entity/__tests__/account.make-fake';

describe('GoogleAuthStrategySignInService (Unit)', () => {
  let googleAuthStrategySignInService: GoogleAuthStrategySignInService;
  let googleOAuth2Service: {
    verifyCode: jest.Mock;
  };
  let accountService: {
    getOrCreate: jest.Mock;
  };

  beforeEach(async () => {
    googleOAuth2Service = {
      verifyCode: jest.fn(),
    };

    accountService = {
      getOrCreate: jest.fn(),
    };

    const app = await Test.createTestingModule({
      providers: [
        GoogleAuthStrategySignInService,
        GoogleOAuthService,
        AccountService,
      ],
    })
      .overrideProvider(AccountService)
      .useValue(accountService)
      .overrideProvider(GoogleOAuthService)
      .useValue(googleOAuth2Service)
      .compile();

    googleAuthStrategySignInService = app.get(GoogleAuthStrategySignInService);
  });

  it('should be defined', () => {
    expect(googleAuthStrategySignInService).toBeDefined();
  });

  it('should call googleOAuth2Service.verifyCode with params', async () => {
    const params = {
      code: faker.string.alphanumeric(),
    };

    googleOAuth2Service.verifyCode.mockResolvedValueOnce({
      email: faker.internet.email(),
    });

    accountService.getOrCreate.mockResolvedValueOnce({
      account: makeFakeAccount(),
    });

    await googleAuthStrategySignInService.execute(params);

    expect(googleOAuth2Service.verifyCode).toBeCalledWith(params);
  });

  it('should call accountService.getOrCreate with email', async () => {
    const params = {
      code: faker.string.alphanumeric(),
    };

    const email = faker.internet.email();

    googleOAuth2Service.verifyCode.mockResolvedValueOnce({ email });

    accountService.getOrCreate.mockResolvedValueOnce({
      account: makeFakeAccount(),
    });

    await googleAuthStrategySignInService.execute(params);

    expect(accountService.getOrCreate).toBeCalledWith({
      get: { by: { email } },
      create: { data: { email } },
    });
  });

  it('should return account', async () => {
    const params = {
      code: faker.string.alphanumeric(),
    };

    const email = faker.internet.email();

    const account = makeFakeAccount();

    googleOAuth2Service.verifyCode.mockResolvedValueOnce({ email });
    accountService.getOrCreate.mockResolvedValueOnce({ account });

    const response = await googleAuthStrategySignInService.execute(params);

    expect(response.account.id).toEqual(account.id);
  });
});
