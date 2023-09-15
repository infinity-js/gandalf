export type AccountEmail = {
  address: string;
  isVerified: boolean;
};

export type AccountData = {
  id: string;
  emails: AccountEmail[];
};
