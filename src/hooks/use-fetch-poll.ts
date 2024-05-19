import { pollsFetch } from "@/api/polls-fetch";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "./redux";
import { pollSliceActions } from "@/features/poll";

export function useFetchPoll() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchPoll = useCallback(async (id: string) => {
    try {
      dispatch(pollSliceActions.startLoading());
      const axiosRes = await pollsFetch.findOne(id);
      dispatch(pollSliceActions.update(axiosRes.data.poll));
      dispatch(pollSliceActions.stopLoading());
    } catch (error) {
      navigate("/");
    }
  }, []);

  return { fetchPoll };
}
