export enum AuthStrategyType {
  google = 'google',
}

export type AuthStrategyData<T> = {
  type: AuthStrategyType | keyof typeof AuthStrategyType;
  data: T;
};
