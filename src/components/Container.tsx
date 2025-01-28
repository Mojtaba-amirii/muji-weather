import { cn } from "@/utils/cn";
import { HTMLProps } from "react";

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  className?: string;
}

export const Container = ({ className = "", ...props }: ContainerProps) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full bg-white border rounded-xl shadow-xs p-1 sm:py-4 sm:px-6 flex hover:shadow-md transition-shadow duration-300",
        className
      )}
      role="region"
      aria-label="Container"
    />
  );
};
