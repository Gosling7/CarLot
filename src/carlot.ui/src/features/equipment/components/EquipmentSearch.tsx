interface EquipmentSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const EquipmentSearch = ({
  value,
  onChange,
}: EquipmentSearchProps) => {
  return (
    <input
      type="text"
      placeholder="Search equipment..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  );
};
