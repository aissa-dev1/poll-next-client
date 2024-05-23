import { usersFetch } from "@/api/users-fetch";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "./redux";
import { useState } from "react";
import { authUserSliceActions } from "@/features/auth-user";

export function useChangeBio() {
  const authUserState = useAppSelector((state) => state.authUser);
  const { toast } = useToast();
  const [bioLoading, setBioLoading] = useState(false);
  const dispatch = useAppDispatch();

  const changeBio = async (bio: string) => {
    if (bioLoading) return;
    try {
      setBioLoading(true);
      const axiosRes = await usersFetch.changeBio(
        authUserState._id,
        bio,
        authUserState.authToken
      );
      dispatch(authUserSliceActions.updateBio(bio));
      setBioLoading(false);
      toast({
        title: "Done!",
        description: axiosRes.data.message,
      });
    } catch (error: any) {
      setBioLoading(false);
      toast({
        title: "Cannot change your bio!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return { changeBio, bioLoading };
}
