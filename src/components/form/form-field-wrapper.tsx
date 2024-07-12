export function FormFieldWrapper({
  children,
  required,
  label,
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 text-black">
      <p className="">
        {label}
        {required && <span className="text-red-500 ml-1 mt-1">*</span>}
      </p>
      {children}
    </div>
  );
}
