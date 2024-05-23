import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { authUserSliceActions } from "@/features/auth-user";
import { Link, useNavigate } from "react-router-dom";

const NavBarDropDown = () => {
  const authUserState = useAppSelector((state) => state.authUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center border rounded-full shadow-sm border-input bg-background hover:bg-accent hover:text-accent-foreground">
        <Avatar>
          <AvatarImage
            src={
              authUserState.authenticated
                ? `/user-avatars/${authUserState.avatar}`
                : "/user-avatars/user-avatar-default.svg"
            }
          />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        {authUserState.authenticated && (
          <>
            <DropdownMenuLabel>Profiles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={`/profile/${authUserState._id}`}>
              <DropdownMenuItem>My Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                dispatch(authUserSliceActions.logout());
                navigate("/");
              }}
            >
              Log out
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/settings">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavBarDropDown;
