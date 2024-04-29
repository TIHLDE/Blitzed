import React from 'react';
import {cn} from "@/app/utils/tailwindCN";

type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>

function Input({
  value,
  onChange,
  type = 'text',
  id,
  className = '',
  required = true,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={cn('mt-1 p-2 w-full border rounded-md', className)}
      required={required}
    />
  );
}

export default Input;
