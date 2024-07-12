import React from "react";
import { useController, Control } from "react-hook-form";

interface CustomInputProps {
  name: string;
  control: Control<any>;
  placeholder: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  placeholder,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div>
      <input
        {...field}
        placeholder={placeholder}
        className={`w-full border disabled:cursor-not-allowed disabled:opacity-50 border-orange-500 bg-orange-50 text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-orange-500 p-2.5 text-sm rounded-lg ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
