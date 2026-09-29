import { type InputHTMLAttributes } from 'react'

type TextAreaZodProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaZod = ({ label, error, ...textAreaProps }: TextAreaZodProps) => {
  return (
    <fieldset className="fieldset mx-2 mt-2">
      <legend className="fieldset-legend">{label}</legend>
      <textarea
        className={`textarea h-24 rounded-lg w-full ${error ? "textarea-error" : ""}`}
        {...textAreaProps}
      />

      {error && (
        <p className="text-error text-sm mt-1">{error}</p>
      )}

    </fieldset>
  )
}
