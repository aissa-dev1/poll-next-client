import { usersFetch } from "@/api/users-fetch";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "./redux";
import { useState } from "react";
import { authUserSliceActions } from "@/features/auth-user";

export function useChangeName() {
  const authUserState = useAppSelector((state) => state.authUser);
  const { toast } = useToast();
  const [nameLoading, setNameLoading] = useState(false);
  const dispatch = useAppDispatch();

  const changeName = async (fullName: string) => {
    if (nameLoading) return;
    try {
      setNameLoading(true);
      const axiosRes = await usersFetch.changeName(
        authUserState._id,
        fullName,
        authUserState.authToken
      );
      dispatch(authUserSliceActions.updateFullName(fullName));
      setNameLoading(false);
      toast({
        title: "Done!",
        description: axiosRes.data.message,
      });
    } catch (error: any) {
      setNameLoading(false);
      toast({
        title: "Cannot change your name!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return { changeName, nameLoading };
}
