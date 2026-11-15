import React from "react";
import { cn } from "@/lib/utils";

export const Button = ({ children, className = "", onClick, type = "button", ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 font-medium text-white transition hover:bg-brand-600 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
