import { usersFetch } from "@/api/users-fetch";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "./redux";
import { profileSliceActions } from "@/features/profile";
import { UserTypeWithPolls } from "@/features/types";

export function useFetchProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchProfile = useCallback(async (id: string) => {
    try {
      dispatch(profileSliceActions.startLoading());
      const axiosRes = await usersFetch.findOneWithPolls(id);
      const data: UserTypeWithPolls = {
        ...axiosRes.data.user,
        polls: axiosRes.data.polls,
      };
      dispatch(profileSliceActions.update(data));
      dispatch(profileSliceActions.stopLoading());
    } catch (error) {
      navigate("/");
    }
  }, []);

  return { fetchProfile };
}
