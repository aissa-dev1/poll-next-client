import { RegisterData } from "@/api/types";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNavigate } from "react-router";
import { useToast } from "@/components/ui/use-toast";
import { authFetch } from "@/api/auth-fetch";
import { registerSliceActions } from "@/features/register";

export function useRegister() {
  const registerState = useAppSelector((state) => state.register);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const register = async (data: RegisterData) => {
    if (registerState.status === "completed") return;
    if (!registerState.termsAgree) {
      toast({
        title: "Cannot create your account!",
        description: "Please agree to our terms & privacy",
        variant: "destructive",
      });
      return;
    }
    try {
      const axiosRes = await authFetch.register(data);
      dispatch(registerSliceActions.registerCompleted());
      toast({
        title: "Your account has created successfully!",
        description: axiosRes.data.message,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Cannot create your account!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return { register };
}
