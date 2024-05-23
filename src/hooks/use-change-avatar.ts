import { usersFetch } from "@/api/users-fetch";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "./redux";
import { useState } from "react";
import { authUserSliceActions } from "@/features/auth-user";

export function useChangeAvatar() {
  const authUserState = useAppSelector((state) => state.authUser);
  const { toast } = useToast();
  const [avatarLoading, setAvatarLoading] = useState(false);
  const dispatch = useAppDispatch();

  const changeAvatar = async (avatar: string) => {
    if (avatarLoading) return;
    try {
      setAvatarLoading(true);
      const axiosRes = await usersFetch.changeAvatar(
        authUserState._id,
        avatar,
        authUserState.authToken
      );
      dispatch(authUserSliceActions.updateAvatar(avatar));
      setAvatarLoading(false);
      toast({
        title: "Done!",
        description: axiosRes.data.message,
      });
    } catch (error: any) {
      setAvatarLoading(false);
      toast({
        title: "Cannot change your avatar!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return { changeAvatar, avatarLoading };
}
