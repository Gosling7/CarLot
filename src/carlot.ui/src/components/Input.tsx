import type { ChangeEventHandler, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function InputOld({ label, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-gray-600 font-medium mb-1">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full border rounded-lg focus:outline-none focus:ring-2"
      />
    </div>
  );
}

type Props = {
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

export const Input = ({ label, type = "text", placeholder, value, onChange }: Props) => {
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

type PropsZod = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputZod = ({ label, error, ...inputProps }: PropsZod) => {
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