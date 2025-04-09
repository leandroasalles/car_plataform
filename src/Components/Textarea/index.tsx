import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
  placeholder?: string;
  id: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  defaultValue?: string | number;
}

export function TextArea({
  placeholder,
  id,
  register,
  rules,
  error,
  defaultValue,
}: InputProps) {
  return (
    <div>
      <textarea
        className="p-2 w-full h-24 resize-none outline-none border-2 border-slate-200"
        placeholder={placeholder}
        id={id}
        {...register(id, rules)}
        defaultValue={defaultValue}
      ></textarea>
      {error && <p className="w-full text-red-600 text-xs">{error}</p>}
    </div>
  );
}
