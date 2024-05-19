import { Link } from "react-router-dom";
import Container from "../container";
import NavBar from "../navBar";
import { Button } from "../ui/button";

const Settings = () => {
  return (
    <>
      <NavBar title="Poll Next | Settings" />
      <Container className="mt-32">
        <div className="flex flex-col gap-4">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <p>It is not ready yet.</p>
        </div>
      </Container>
    </>
  );
};

export default Settings;
