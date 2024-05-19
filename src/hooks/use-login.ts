import { LoginData } from "@/api/types";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNavigate } from "react-router";
import { useToast } from "@/components/ui/use-toast";
import { authFetch } from "@/api/auth-fetch";
import { authUserSliceActions } from "@/features/auth-user";
import { loginSliceActions } from "@/features/login";
import { useCallback } from "react";

export function useLogin() {
  const loginState = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = useCallback(
    async (data: LoginData) => {
      if (loginState.status === "completed") return;
      try {
        const axiosRes = await authFetch.login(data);
        dispatch(authUserSliceActions.updateAuthToken(axiosRes.data.authToken));
        dispatch(loginSliceActions.loginCompleted());
        navigate("/");
      } catch (error: any) {
        toast({
          title: "Cannot continue to your account!",
          description: error.response.data.message,
          variant: "destructive",
        });
      }
    },
    [loginState, dispatch]
  );

  return { login };
}
