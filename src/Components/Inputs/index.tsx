import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
  placeholder?: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  defaultValue?: string | number;
}

export function Input({
  placeholder,
  type,
  name,
  register,
  rules,
  error,
  defaultValue,
}: InputProps) {
  return (
    <div>
      <input
        className="rounded-lg h-8 w-full p-2 outline-none border-2 border-slate-200 mb-2"
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name, rules)}
        defaultValue={defaultValue}
        // onChange={(e) => register(name, rules).onChange(e)}
      />
      {error && <p className="w-full text-red-600 text-xs">{error}</p>}
    </div>
  );
}
