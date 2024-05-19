import { useAppSelector } from "@/hooks/redux";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CardSkeleton = () => {
  return <Skeleton className="w-full h-24 rounded-lg" />;
};

const WelcomeCard = () => {
  const authUserState = useAppSelector((state) => state.authUser);

  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-r from-purple-700/15 to-blue-700/5">
      <h3 className="text-xl font-bold">Welcome {authUserState.fullName}</h3>
    </Card>
  );
};

export default WelcomeCard;
