import { useCallback } from "react";
import { useNavigate } from "react-router";
import { PollType } from "@/features/types";

export function useFetchRandomPoll() {
  const navigate = useNavigate();

  const fetchRandomPoll = useCallback(async (pollsState: PollType[]) => {
    const poll = pollsState[Math.floor(Math.random() * pollsState.length)];
    navigate(`/polls/${poll._id}`);
  }, []);

  return { fetchRandomPoll };
}
