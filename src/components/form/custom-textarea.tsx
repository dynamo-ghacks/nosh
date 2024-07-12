import React from "react";
import { useController, Control } from "react-hook-form";

interface CustomTextareaProps {
  name: string;
  control: Control<any>;
  placeholder: string;
}

export const CustomTextarea: React.FC<CustomTextareaProps> = ({
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
      <textarea
        {...field}
        placeholder={placeholder}
        className={`w-full border disabled:cursor-not-allowed disabled:opacity-50 border-orange-500 text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-orange-500 p-2.5 text-sm rounded-lg ${
          error ? "border-red-500" : ""
        }`}
        rows={4}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
