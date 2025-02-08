import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface IInputProp {
  name: string;
  label: string;
  disabled?: boolean;
  classes?: string;
  placeholder?: string;
  enableForgot?: boolean;
  type?: "text" | "email" | "date" | "number" | "password" | "hidden";
}
const HInputField = ({
  label,
  name,
  type = "text",
  disabled,
  placeholder,
  classes
}: IInputProp) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const message = errors[name];

  const _type = showPassword ? 'text' : 'password';
  
  return (
    <div className={`mb-4 ${type === "hidden" && "invisible hidden"}`}>
      <div className="flex justify-between items-center">
        <label
          htmlFor="email"
          className={`${
            classes ? "text-white" : ""
          } block font-semibold text-sm mb-2`}
        >
          {label}
        </label>
       
      </div>
      <div className="relative border rounded-md">
        <input
          type={type === 'password' ? _type : type}
          id={name}
          placeholder={placeholder}
          {...register(name)}
          disabled={disabled}
          className={`${classes} py-3 px-4 block w-full border-gray-800 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:disabled:opacity-80 dark:disabled:text-gray-500 dark:disabled:bg-neutral-900 disabled:pointer-events-none dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600`}
          aria-describedby="email-error"
        />
      </div>
      {message && (
        <p className="text-xs text-red-600 mt-2" id="email-error">
          {/* @ts-ignore */}
          {message?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default HInputField;
