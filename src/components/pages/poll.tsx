import { useFetchPoll } from "@/hooks/use-fetch-poll";
import Container from "../container";
import NavBar from "../navBar";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAppSelector } from "@/hooks/redux";
import { PollSkeleton } from "../home/showPoll";
import IconButton from "../home/iconButton";
import { useFetchPollOwner } from "@/hooks/use-fetch-poll-owner";
import { Skeleton } from "../ui/skeleton";
import HeartIcon from "../icons/heartIcon";
import { Badge } from "../ui/badge";
import { useRefreshLogin } from "@/hooks/use-refresh-login";
import { useTitle } from "@/hooks/use-title";
import { useLikePoll } from "@/hooks/use-like-poll";
import HeartSolidIcon from "../icons/heartSolidIcon";
import Loader from "../loader";
import { useVotePollOption } from "@/hooks/use-vote-poll-option";
import AuthPopUp from "../auth/authPopUp";
import { buildVotePercentage } from "@/utils/build-vote-percentage";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useClipboard } from "@/hooks/use-clipboard";
import ShareIcon from "../icons/shareIcon";
import ShareSolidIcon from "../icons/shareSolidIcon";
import { useFetchRandomPoll } from "@/hooks/use-fetch-random-poll";
import { useFetchPolls } from "@/hooks/use-fetch-polls";
import DeletePollDialog from "../polls/deletePollDialog";

const Poll = () => {
  const pollsState = useAppSelector((state) => state.polls);
  const pollState = useAppSelector((state) => state.poll);
  const authUserState = useAppSelector((state) => state.authUser);
  const location = useLocation();
  const { refreshLogin } = useRefreshLogin();
  const { fetchPolls } = useFetchPolls();
  const { fetchPoll } = useFetchPoll();
  const { fetchRandomPoll } = useFetchRandomPoll();
  const { fetchPollOwner, pollOwner, loading } = useFetchPollOwner();
  const { likePoll, heartLoading } = useLikePoll();
  const { votePollOption } = useVotePollOption();
  const { copyText, copied } = useClipboard();
  const id = location.pathname.split("/")[2];
  const totalVoters = pollState.options.reduce((total, option) => {
    return total + option.voters.length;
  }, 0);

  useTitle(`Polls | ${pollOwner.fullName}'s Poll`);

  const bootstrap = useCallback(async () => {
    await refreshLogin(authUserState.authToken);
    await fetchPolls();
    await fetchPoll(id);
    await fetchPollOwner(pollState.userId);
  }, [
    refreshLogin,
    fetchPolls,
    authUserState.authToken,
    fetchPoll,
    fetchPollOwner,
    id,
    pollState.userId,
  ]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return (
    <>
      <NavBar title={`Polls | ${pollOwner.fullName}'s Poll`} />
      <Container className="mt-32">
        <div className="flex items-center justify-between my-4">
          <Link to="/">
            <Button className="w-full">Home</Button>
          </Link>
          <Button
            onClick={async () => {
              if (pollsState.loading) return;
              await fetchRandomPoll(pollsState.list);
            }}
          >
            {pollsState.loading ? <Loader /> : <p>Next</p>}
          </Button>
        </div>
        {pollState.loading ? (
          <PollSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-[30px] h-[30px] rounded-full" />
                    <Skeleton className="w-[100px] h-[20px] rounded" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <Link
                      className="flex items-center gap-2 w-fit"
                      to={`/profile/${pollOwner._id}`}
                    >
                      <IconButton
                        avatarImage={`/user-avatars/${pollOwner.avatar}`}
                        avatarFallback={pollOwner.fullName
                          .slice(0, 2)
                          .toUpperCase()}
                      />
                      <p>{pollOwner.fullName}</p>
                    </Link>
                    {authUserState._id === pollOwner._id && (
                      <DeletePollDialog />
                    )}
                  </div>
                )}
              </CardTitle>
              <CardDescription>{pollState.question}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {pollState.options.map((option, index) => {
                  const percentage = buildVotePercentage(
                    option.voters.length,
                    totalVoters
                  );

                  return authUserState.authenticated ? (
                    <div className="relative" key={option.id}>
                      {option.voters.includes(authUserState._id) && (
                        <div className="absolute w-3 h-3 -translate-y-1/2 rounded-full bg-black/75 top-1/2 -left-4"></div>
                      )}
                      <Badge
                        className="relative flex items-center justify-between p-4 cursor-pointer"
                        variant="outline"
                        onClick={async () => {
                          await votePollOption(
                            {
                              id: pollState._id,
                              fanId: authUserState._id,
                              index,
                            },
                            authUserState.authToken
                          );
                        }}
                      >
                        {pollState.options.some((option) =>
                          option.voters.includes(authUserState._id)
                        ) &&
                          option.voters.length > 0 && (
                            <div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700/5 to-purple-700/15"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          )}
                        <p>{option.name}</p>
                        {pollState.options.some((option) =>
                          option.voters.includes(authUserState._id)
                        ) && <p>{percentage}%</p>}
                      </Badge>
                    </div>
                  ) : (
                    <AuthPopUp key={option.id}>
                      <Badge
                        className="flex items-center justify-between p-4 cursor-pointer"
                        variant="outline"
                      >
                        <p>{option.name}</p>
                      </Badge>
                    </AuthPopUp>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {authUserState.authenticated ? (
                    <>
                      {heartLoading ? (
                        <Loader />
                      ) : pollState.likes.includes(authUserState._id) ? (
                        <HeartSolidIcon
                          onClick={async () => {
                            await likePoll(
                              {
                                id: pollState._id,
                                fanId: authUserState._id,
                              },
                              authUserState.authToken
                            );
                          }}
                        />
                      ) : (
                        <HeartIcon
                          onClick={async () => {
                            await likePoll(
                              {
                                id: pollState._id,
                                fanId: authUserState._id,
                              },
                              authUserState.authToken
                            );
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <AuthPopUp>
                      <HeartIcon />
                    </AuthPopUp>
                  )}
                  <p>{pollState.likes.length}</p>
                </div>
                {copied ? (
                  <ShareSolidIcon />
                ) : (
                  <ShareIcon
                    onClick={async () => {
                      await copyText(
                        `${window.location.host}/polls/${pollState._id}`
                      );
                    }}
                  />
                )}
              </div>
            </CardFooter>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Poll;
