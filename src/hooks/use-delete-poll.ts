import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "./redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { pollsFetch } from "@/api/polls-fetch";

export function useDeletePoll() {
  const authUserState = useAppSelector((state) => state.authUser);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deletePoll = async (id: string) => {
    if (deleteLoading) return;
    try {
      setDeleteLoading(true);
      await pollsFetch.deleteOne(id, authUserState.authToken);
      setDeleteLoading(false);
      navigate("/");
    } catch (error: any) {
      setDeleteLoading(false);
      toast({
        title: "Cannot delete your poll!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return { deletePoll, deleteLoading };
}
