import { pollsFetch } from "@/api/polls-fetch";
import { CreatePollData } from "@/api/types";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "./redux";
import { pollsSliceActions } from "@/features/polls";
import { createPollSliceActions } from "@/features/create-poll";

export function useCreatePoll() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const createPoll = async (data: CreatePollData, token: string) => {
    try {
      const axiosRes = await pollsFetch.createOne(data, token);
      dispatch(createPollSliceActions.reset());
      dispatch(pollsSliceActions.enableFetch());
      toast({
        title: "Your poll created successfully!",
        description: axiosRes.data.message,
      });
    } catch (error: any) {
      toast({
        title: "Cannot create your poll!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return { createPoll };
}
