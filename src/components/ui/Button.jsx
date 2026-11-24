import React from "react";
import { cn } from "@/lib/utils";

export const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  variant = "brand",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        variant === "outline" ? "btn-outline" : "btn-brand",
        "px-4 py-2 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
