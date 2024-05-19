export type UserTypeWithoutPolls = {
  authToken: string;
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
  bio: string;
};

export type UserTypeWithPolls = {
  authToken: string;
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
  bio: string;
  polls: PollType[];
};

export type UserPollType = {
  _id: string;
  fullName: string;
  avatar: string;
};

export type PollOptionType = {
  id: string;
  name: string;
  voters: string[];
};

export type PollType = {
  _id: string;
  userId: string;
  question: string;
  options: PollOptionType[];
  category: string;
  likes: string[];
};

export type AuthStatus = "pending" | "completed";

export type PollOptionVotePayload = {
  fanId: string;
  index: number;
};
