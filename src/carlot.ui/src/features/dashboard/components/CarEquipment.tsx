import type { EquipmentDto } from "@/types/EquipmentDto";

type CarEquipmentProps = {
  equipment: EquipmentDto[];
  checkedEquipmentCodes?: string[];
  onToggle: (code: string) => void;
}

export const CarEquipment = ({
  equipment,
  checkedEquipmentCodes = [],
  onToggle,
}: CarEquipmentProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-2 max-h-64 overflow-y-auto mt-4">
      {equipment?.map((eq) => (
        <Checkbox
          key={eq.code}
          label={eq.name}
          checked={checkedEquipmentCodes?.includes(eq.code)}
          onToggle={() => onToggle(eq.code)}
        />
      ))}
    </div>
  );
};

type CheckboxProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const Checkbox = ({ label, checked, onToggle }: CheckboxProps) => (
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

