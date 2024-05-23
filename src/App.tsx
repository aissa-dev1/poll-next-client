import Container from "./components/container";
import NavBar from "./components/navBar";
import { useFetchPolls } from "./hooks/use-fetch-polls";
import Polls, { PollsSkeleton } from "./components/home/polls";
import AuthReminderCard from "./components/auth/authReminderCard";
import SponsorCard from "./components/home/sponsorCard";
import { useTitle } from "./hooks/use-title";
import { useRefreshLogin } from "./hooks/use-refresh-login";
import { useAppSelector } from "./hooks/redux";
import { useCallback, useEffect } from "react";
import WelcomeCard, { CardSkeleton } from "./components/home/welcomeCard";
import UsageCard from "./components/home/usageCard";

const App = () => {
  const pollsState = useAppSelector((state) => state.polls);
  const authUserState = useAppSelector((state) => state.authUser);
  const generalSettingsState = useAppSelector((state) => state.generalSettings);
  const { refreshLogin } = useRefreshLogin();
  const { fetchPolls } = useFetchPolls();
  useTitle("Poll Next");

  const bootstrap = useCallback(async () => {
    await refreshLogin(authUserState.authToken);
    await fetchPolls();
  }, []);

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <>
      <NavBar title="Poll Next" />
      <Container className="mt-32 mb-16">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          {authUserState.loading ? (
            <CardSkeleton />
          ) : authUserState.authenticated ? (
            <WelcomeCard />
          ) : (
            <AuthReminderCard />
          )}
          {authUserState.loading ? <CardSkeleton /> : <SponsorCard />}
        </div>
        <div className="my-4">
          {generalSettingsState.showUsageGuideCard && <UsageCard />}
        </div>
        {pollsState.loading ? (
          <PollsSkeleton />
        ) : (
          <Polls polls={pollsState.list} />
        )}
      </Container>
    </>
  );
};

export default App;
