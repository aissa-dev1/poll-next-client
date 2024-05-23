import { useAppDispatch } from "./redux";
import { VotePollOptionData } from "@/api/types";
import { pollsFetch } from "@/api/polls-fetch";
import { pollSliceActions } from "@/features/poll";
import { pollsSliceActions } from "@/features/polls";

export function useVotePollOption() {
  const dispatch = useAppDispatch();

  const votePollOption = async (data: VotePollOptionData, token: string) => {
    await pollsFetch.voteOneOption(data, token);
    dispatch(
      pollSliceActions.voteOption({ fanId: data.fanId, index: data.index })
    );
    dispatch(pollsSliceActions.enableFetch());
  };

  return { votePollOption };
}
