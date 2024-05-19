import { useAppDispatch, useAppSelector } from "./redux";
import { pollsFetch } from "@/api/polls-fetch";
import { pollsSliceActions } from "@/features/polls";
import { PollType } from "@/features/types";
import { useCallback } from "react";

export function useFetchPolls() {
  const pollsState = useAppSelector((state) => state.polls);
  const dispatch = useAppDispatch();

  const fetchPolls = useCallback(async () => {
    if (!pollsState.allowFetch) return;
    dispatch(pollsSliceActions.startLoading());
    const axiosRes = await pollsFetch.findAll();
    const fetchedPolls: PollType[] = axiosRes.data.polls;
    dispatch(pollsSliceActions.updatePolls(fetchedPolls));
    dispatch(pollsSliceActions.stopLoading());
    dispatch(pollsSliceActions.disableFetch());
    setTimeout(() => {
      dispatch(pollsSliceActions.enableFetch());
    }, 1000 * 30);
  }, []);

  return { fetchPolls };
}
