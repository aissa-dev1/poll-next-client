import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import Container from "./container";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import NavBarDropDown from "./navBarDropDown";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

interface NavBarProps extends ComponentProps<"nav"> {
  title: string;
  excludeDropDown?: boolean;
}

const NavBar = ({
  className,
  title,
  excludeDropDown,
  ...rest
}: NavBarProps) => {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full flex flex-col justify-center h-28 shadow-sm shadow-black/10 bg-opacity-25 backdrop-blur-lg backdrop-filter z-10",
        className
      )}
      {...rest}
    >
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/poll-next.jpg" />
            <AvatarFallback>PN</AvatarFallback>
          </Avatar>
          <h3 className="font-bold">{title}</h3>
        </div>

        {!excludeDropDown && (
          <div className="flex items-center gap-4">
            <Link to="/create-poll">
              <Button size="icon" variant="outline" className="rounded-full">
                <PlusIcon />
              </Button>
            </Link>
            <NavBarDropDown />
          </div>
        )}
      </Container>
    </nav>
  );
};

export default NavBar;
