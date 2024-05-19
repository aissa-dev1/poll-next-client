import { PollOptionType, PollType } from "@/features/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useCallback, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { useFetchPollOwner } from "@/hooks/use-fetch-poll-owner";
import IconButton from "./iconButton";
import { useAppSelector } from "@/hooks/redux";
import { Link } from "react-router-dom";
import HeartSolidIcon from "../icons/heartSolidIcon";
import HeartIcon from "../icons/heartIcon";

interface PollOptionProps extends PollOptionType {}

const PollOption = ({ name, voters }: PollOptionProps) => {
  const authUserState = useAppSelector((state) => state.authUser);

  return (
    <Badge
      className="flex items-center justify-between p-4 cursor-pointer"
      variant={voters.includes(authUserState._id) ? "default" : "outline"}
    >
      <p>{name}</p>
    </Badge>
  );
};

interface PollProps extends PollType {}

export const PollSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-2">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded" />
      </div>
      <Skeleton className="w-[100px] h-[20px] rounded" />
      <div className="grid grid-cols-1 gap-2">
        <Skeleton className="w-full h-[40px] rounded" />
        <Skeleton className="w-full h-[40px] rounded" />
        <Skeleton className="w-full h-[40px] rounded" />
        <Skeleton className="w-full h-[40px] rounded" />
      </div>
      <Skeleton className="w-[100px] h-[20px] rounded" />
    </div>
  );
};

const ShowPoll = (props: PollProps) => {
  const authUserState = useAppSelector((state) => state.authUser);
  const { fetchPollOwner, pollOwner, loading } = useFetchPollOwner();

  const bootstrap = useCallback(async () => {
    await fetchPollOwner(props.userId);
  }, []);

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <Link to={`/polls/${props._id}`}>
      <Card>
        <CardHeader>
          <CardTitle>
            {loading ? (
              <div className="flex items-center gap-2">
                <Skeleton className="w-[30px] h-[30px] rounded-full" />
                <Skeleton className="w-[100px] h-[20px] rounded" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <IconButton
                  avatarImage={`/user-avatars/${pollOwner.avatar}`}
                  avatarFallback={pollOwner.fullName.slice(0, 2).toUpperCase()}
                />
                <p>{pollOwner.fullName}</p>
              </div>
            )}
          </CardTitle>
          <CardDescription>{props.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {props.options.map((option) => (
              <PollOption key={option.id} {...option} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            {props.likes.includes(authUserState._id) ? (
              <HeartSolidIcon />
            ) : (
              <HeartIcon />
            )}
            <p>{props.likes.length}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ShowPoll;
