import { pollsFetch } from "@/api/polls-fetch";
import { LikePollData } from "@/api/types";
import { useState } from "react";
import { useAppDispatch } from "./redux";
import { pollSliceActions } from "@/features/poll";
import { pollsSliceActions } from "@/features/polls";

export function useLikePoll() {
  const dispatch = useAppDispatch();
  const [heartLoading, setHeartLoading] = useState(false);

  const likePoll = async ({ id, fanId }: LikePollData, token: string) => {
    setHeartLoading(true);
    await pollsFetch.likeOne({ id, fanId }, token);
    dispatch(pollSliceActions.toggleLike(fanId));
    dispatch(pollsSliceActions.enableFetch());
    setHeartLoading(false);
  };

  return { likePoll, heartLoading };
}
