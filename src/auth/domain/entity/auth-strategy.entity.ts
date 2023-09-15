import { GoogleAuthStrategy } from 'src/auth/strategies/google/domain/google.auth-strategy';
import { GoogleAuthStrategyData } from 'src/auth/strategies/google/domain/google.auth-strategy.types';
import { AuthStrategyData } from './auth-strategy.entity.types';

export abstract class AuthStrategy<DataType> {
  protected data: AuthStrategyData<DataType>;

  constructor(data: AuthStrategyData<DataType>) {
    this.data = data;
  }

  static fromData(data: AuthStrategyData<unknown>): AuthStrategy<unknown> {
    if (this.isGoogle(data)) {
      return new GoogleAuthStrategyParser(data);
    }

    throw new Error('Invalid auth strategy type');
  }

  private static isGoogle(
    data: AuthStrategyData<unknown>,
  ): data is AuthStrategyData<GoogleAuthStrategyData> {
    return data.type === 'google';
  }

  isGoogle(): this is GoogleAuthStrategyParser {
    return this.data.type === 'google';
  }

  getData(): AuthStrategyData<DataType> {
    return this.data;
  }
}

export class GoogleAuthStrategyParser extends AuthStrategy<GoogleAuthStrategyData> {
  toGoogle(): GoogleAuthStrategy {
    return GoogleAuthStrategy.fromData(this.data.data);
  }
}
