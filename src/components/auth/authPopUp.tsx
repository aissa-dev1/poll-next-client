import { ComponentProps } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface AuthPopUpProps extends ComponentProps<"div"> {}

const AuthPopUp = ({ className, children, ...rest }: AuthPopUpProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("trigger-wrapper", className)} {...rest}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please Authenticate to continue.</DialogTitle>
          <DialogDescription>
            Once you join Poll Next, you can complete this action.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2">
          <Link to="/login">
            <Button className="w-full">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="w-full">
              Create account
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPopUp;
