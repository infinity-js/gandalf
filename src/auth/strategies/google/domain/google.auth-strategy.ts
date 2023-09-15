import { GoogleAuthStrategyData } from './google.auth-strategy.types';

export class GoogleAuthStrategy {
  #data: GoogleAuthStrategyData;

  private constructor(data: GoogleAuthStrategyData) {
    this.#data = data;
  }

  static fromData(data: GoogleAuthStrategyData): GoogleAuthStrategy {
    return new GoogleAuthStrategy(data);
  }

  get accountId(): string {
    return this.#data.accountId;
  }

  get googleId(): string {
    return this.#data.googleId;
  }

  get email(): string {
    return this.#data.email;
  }
}
