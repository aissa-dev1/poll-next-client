export type RegisterData = {
  email: string;
  password: string;
  fullName: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type CreatePollData = {
  userId: string;
  question: string;
  options: string[];
  category: string;
};

export type LikePollData = {
  id: string;
  fanId: string;
};

export type VotePollOptionData = {
  id: string;
  fanId: string;
  index: number;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  rnewPassword: string;
};

export type DeleteAccountData = {
  password: string;
};
