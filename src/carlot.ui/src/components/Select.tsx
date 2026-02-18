type Props = {
  label: string;
  options: any;
  value: any;
  onChange: (value: number) => void;
}

export const Select = ({ label, options, onChange }: Props) => {
  const enumNumberValues = getEnumNumberValues(options);

  return (
    <fieldset className="fieldset mx-2">
      <legend className="fieldset-legend">{label}</legend>
      <select
        className="select select-sm rounded-lg w-full"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {enumNumberValues.map(intValue => (
          <option key={intValue} value={intValue}>
            {options[intValue]}
          </option>
        ))}
      </select>
    </fieldset>
  )
}

export default Select;

function getEnumNumberValues<T extends Record<string, string | number>>(
  enumObject: T
): number[] {
  return Object.values(enumObject).filter(v => typeof v === "number");
}
