import React from "react";
import { cn } from "@/lib/utils";

export const Container = ({ children, className = "", ...props }) => {
  return (
    <div
      className={cn("mx-auto max-w-300 px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
};
