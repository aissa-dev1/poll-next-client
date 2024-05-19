import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface ContainerProps extends ComponentProps<"div"> {}

const Container = ({ className, children, ...rest }: ContainerProps) => {
  return (
    <div className={cn("container", className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
