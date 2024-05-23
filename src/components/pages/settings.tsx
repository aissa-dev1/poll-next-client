import { Link } from "react-router-dom";
import Container from "../container";
import NavBar from "../navBar";
import { Button } from "../ui/button";
import Account from "../settings/account";
import General from "../settings/general";
import { useAppSelector } from "@/hooks/redux";
import { useRefreshLogin } from "@/hooks/use-refresh-login";
import { useEffect } from "react";
import Advanced from "../settings/advanced";

const Settings = () => {
  const authUserState = useAppSelector((state) => state.authUser);
  const { refreshLogin } = useRefreshLogin();

  const bootstrap = async () => {
    await refreshLogin(authUserState.authToken);
  };

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <>
      <NavBar title="Poll Next | Settings" />
      <Container className="mt-32">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        {authUserState.authenticated ? (
          <div className="flex flex-col gap-12 mt-2">
            <Account />
            <General />
            <Advanced />
          </div>
        ) : (
          <div className="mt-2">
            <p>Please authenticate first to access the settings.</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Settings;
