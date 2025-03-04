import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
  placeholder?: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input({
  placeholder,
  type,
  name,
  register,
  rules,
  error,
}: InputProps) {
  return (
    <div>
      <input
        className="rounded-lg h-8 w-full p-2 outline-none border-2 border-slate-200"
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name, rules)}
      />
      {error && <p className="w-full text-red-600 text-xs">{error}</p>}
    </div>
  );
}
