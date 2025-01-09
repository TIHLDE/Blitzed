import React from "react";
import { cn } from "../../util/tailwind-cn";

type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({
  value,
  onChange,
  type = "text",
  id,
  className = "",
  required = true,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={cn("mt-1 w-full rounded-md border p-2", className)}
      required={required}
    />
  );
}

export default Input;
