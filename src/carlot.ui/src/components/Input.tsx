import type { ChangeEventHandler, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export const Input = ({ label, type = "text", placeholder, value, onChange }: InputProps) => {
  return (
    <fieldset className="fieldset mx-2">
      <legend className="fieldset-legend">{label}</legend>
      <input
        type={type}
        className="input input-sm rounded-lg w-full"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  )
}

type InputZodProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputZod = ({ label, error, ...inputProps }: InputZodProps) => {
  return (
    <fieldset className="fieldset mx-2">
      <legend className="fieldset-legend">{label}</legend>

      <input
        className={`input input-sm rounded-lg w-full ${error ? "input-error" : ""}`}
        {...inputProps}
      />

      {error && (
        <p className="text-error text-sm mt-1">{error}</p>
      )}
    </fieldset>
  );
};