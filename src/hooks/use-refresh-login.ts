import { useAppDispatch } from "./redux";
import { usersFetch } from "@/api/users-fetch";
import { authUserSliceActions } from "@/features/auth-user";
import { UserTypeWithPolls } from "@/features/types";
import { storage } from "@/utils/storage";
import { useCallback } from "react";

export function useRefreshLogin() {
  const dispatch = useAppDispatch();

  const refreshLogin = useCallback(async (token: string) => {
    if (!token) {
      dispatch(authUserSliceActions.logout());
      dispatch(authUserSliceActions.stopLoading());
      return;
    }
    try {
      dispatch(authUserSliceActions.startLoading());
      const axiosRes = await usersFetch.findOneWithToken(token);
      const data: UserTypeWithPolls = {
        ...axiosRes.data.user,
        polls: axiosRes.data.polls,
      };
      dispatch(authUserSliceActions.login(data));
      dispatch(authUserSliceActions.stopLoading());
    } catch (error: any) {
      storage.remove("token");
      dispatch(authUserSliceActions.logout());
      dispatch(authUserSliceActions.stopLoading());
    }
  }, []);

  return { refreshLogin };
}
