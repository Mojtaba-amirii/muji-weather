import { cn } from "@/utils/cn";
import { HTMLProps } from "react";

export const Container = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        " w-full bg-white border rounded-xl shadow-sm py-4 flex",
        props.className
      )}
    />
  );
};