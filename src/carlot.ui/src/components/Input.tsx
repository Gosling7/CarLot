interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: InputProps) {
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
