import { usersFetch } from "@/api/users-fetch";
import { UserPollType } from "@/features/types";
import { useCallback, useState } from "react";

export function useFetchPollOwner() {
  const [pollOwner, setPollOwner] = useState<UserPollType>({
    _id: "",
    fullName: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchPollOwner = useCallback(async (userId: string) => {
    if (!userId) return;
    setLoading(true);
    const axiosRes = await usersFetch.findOneMinimized(userId);
    setPollOwner(axiosRes.data.user);
    setLoading(false);
  }, []);

  return { fetchPollOwner, pollOwner, loading };
}
