import { usersFetch } from "@/api/users-fetch";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "./redux";
import { useState } from "react";
import { ChangePasswordData } from "@/api/types";
import { changePasswordSliceActions } from "@/features/change-password";

export function useChangePassword() {
  const authUserState = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [passwordLoading, setpasswordLoading] = useState(false);

  const changePassword = async (data: ChangePasswordData) => {
    if (passwordLoading) return;
    try {
      setpasswordLoading(true);
      const axiosRes = await usersFetch.changePassword(
        authUserState._id,
        data,
        authUserState.authToken
      );
      dispatch(changePasswordSliceActions.reset());
      setpasswordLoading(false);
      toast({
        title: "Done!",
        description: axiosRes.data.message,
      });
    } catch (error: any) {
      setpasswordLoading(false);
      toast({
        title: "Cannot change your password!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return { changePassword, passwordLoading };
}
