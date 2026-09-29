type CheckboxItemProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export const CheckboxItem = ({ label, checked, onToggle }: CheckboxItemProps) => (
  <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 cursor-pointer">
    <input
      type="checkbox"
      className="checkbox checkbox-sm"
      checked={checked}
      onChange={onToggle}
    />
    <span className="text-sm">{label}</span>
  </label>
);