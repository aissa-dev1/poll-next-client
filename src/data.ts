import { UsageCardItem } from "./components/home/usageCard";

type AvatarItemType = {
  id: string;
  src: string;
  code: string;
};

export const usageCardData: UsageCardItem[] = [
  {
    id: "usage-card-1",
    title: "What is this app about?",
    description: `It's a poll web app created by Aissa Bedr to help people create,
    share polls. A poll is a question with a bunch of answers for people
    to answer and express their opinions.`,
  },
  {
    id: "usage-card-2",
    title: "How to use it?",
    description: `Create a poll in the 'Plus' Button on the top nav, share it with
    friends & enjoy.`,
  },
  {
    id: "usage-card-3",
    title: "What about sign in?",
    description: `You can use this app without sign in, but if you want to create a
    poll or react to one you need to sign in.`,
  },
  {
    id: "usage-card-4",
    title: "What about polls?",
    description: `In the home page 'here', you will see a bunch of polls, but you
    can't answer, like or share until you click on that poll.`,
  },
];

export const userAvatarsData: AvatarItemType[] = [
  {
    id: "avatar-1",
    src: "user-avatars/user-avatar-default.svg",
    code: "user-avatar-default.svg",
  },
  {
    id: "avatar-2",
    src: "user-avatars/userb-avatar1.svg",
    code: "userb-avatar1.svg",
  },
  {
    id: "avatar-3",
    src: "user-avatars/userb-avatar2.svg",
    code: "userb-avatar2.svg",
  },
  {
    id: "avatar-4",
    src: "user-avatars/userb-avatar3.svg",
    code: "userb-avatar3.svg",
  },
  {
    id: "avatar-5",
    src: "user-avatars/userg-avatar1.svg",
    code: "userg-avatar1.svg",
  },
  {
    id: "avatar-6",
    src: "user-avatars/userg-avatar2.svg",
    code: "userg-avatar2.svg",
  },
  {
    id: "avatar-7",
    src: "user-avatars/userg-avatar3.svg",
    code: "userg-avatar3.svg",
  },
];
