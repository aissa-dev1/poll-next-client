import { Link } from "react-router-dom";
import Container from "../container";
import NavBar from "../navBar";
import { Button } from "../ui/button";

const NotFound = () => {
  return (
    <>
      <NavBar title="Poll Next" />
      <Container className="mt-32 mb-16">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">
            The link you followed is broken!
          </h3>
          <Link to="/" className="w-fit">
            <Button>Home</Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
