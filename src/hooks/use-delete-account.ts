import { usersFetch } from "@/api/users-fetch";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "./redux";
import { useState } from "react";
import { DeleteAccountData } from "@/api/types";
import { useNavigate } from "react-router";

export function useDeleteAccount() {
  const authUserState = useAppSelector((state) => state.authUser);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const deleteAccount = async (data: DeleteAccountData) => {
    if (loading) return;
    try {
      setLoading(true);
      await usersFetch.deleteOne(
        authUserState._id,
        data,
        authUserState.authToken
      );
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Cannot delete your account!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return { deleteAccount, loading };
}
