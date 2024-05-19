import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ComponentProps<"button"> {
  avatarImage: string;
  avatarFallback: string;
}

const IconButton = ({
  className,
  avatarImage,
  avatarFallback,
  ...rest
}: IconButtonProps) => {
  return (
    <Button
      size="icon"
      variant="outline"
      className={cn("p-5 rounded-full", className)}
      {...rest}
    >
      <Avatar>
        <AvatarImage src={avatarImage} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
    </Button>
  );
};

export default IconButton;
