import { useFetchProfile } from "@/hooks/use-fetch-profile";
import Container from "../container";
import NavBar from "../navBar";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRefreshLogin } from "@/hooks/use-refresh-login";
import { useLocation } from "react-router";
import { useTitle } from "@/hooks/use-title";
import { profileSliceActions } from "@/features/profile";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Polls, { PollsSkeleton } from "../home/polls";
import { Skeleton } from "../ui/skeleton";

const Profile = () => {
  const authUserState = useAppSelector((state) => state.authUser);
  const profileState = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { refreshLogin } = useRefreshLogin();
  const { fetchProfile } = useFetchProfile();
  const id = location.pathname.split("/")[2];

  useTitle(`${profileState.fullName}'s Profile`);

  const bootstrap = useCallback(async () => {
    await refreshLogin(authUserState.authToken);
    await fetchProfile(id);
  }, [id, authUserState.authToken, fetchProfile, refreshLogin]);

  useEffect(() => {
    bootstrap();
    return () => {
      dispatch(profileSliceActions.reset());
    };
  }, [bootstrap]);

  return (
    <>
      <NavBar
        title={
          profileState.loading
            ? "User Profile"
            : `${profileState.fullName}'s Profile`
        }
      />
      <Container className="mt-32 mb-6">
        <div className="my-4">
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {profileState.loading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 rounded-full w-36" />
                <Skeleton className="w-16 h-6 rounded-full" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="bg-black rounded-full w-fit">
                <img
                  className="w-24"
                  src={`/user-avatars/${profileState.avatar}`}
                  alt="profile-logo"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold">{profileState.fullName}</h3>
                <p className="text-sm font-bold">
                  {profileState.polls.length} polls
                </p>
              </div>
            </div>
          )}
          {profileState.loading ? (
            <Skeleton className="w-full h-10 rounded-lg" />
          ) : (
            <div className="flex items-center justify-center p-2 text-center rounded bg-secondary">
              <p className="text-sm font-bold">
                {profileState.bio
                  ? profileState.bio
                  : `${profileState.fullName} has no bio.`}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Polls</p>
            {profileState.loading ? (
              <PollsSkeleton />
            ) : profileState.polls.length > 0 ? (
              <Polls polls={profileState.polls} />
            ) : (
              <div className="flex items-center justify-center p-2 text-center rounded bg-secondary">
                <p className="text-sm font-bold">
                  {`${profileState.fullName} has no polls to show.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
