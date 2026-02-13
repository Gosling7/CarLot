interface SelectProps {
  label: string;
  options: string[];
}

export default function Select({ label, options }: SelectProps) {
  return (
    <div>
      <label className="block text-gray-600 mb-1 font-medium">{label}</label>

      <select className="w-full input">
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
