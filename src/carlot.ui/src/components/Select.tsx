import type { ChangeEventHandler } from "react";

interface SelectProps {
  label: string;
  options: string[];
}

export function SelectOld({ label, options }: SelectProps) {
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


// export const Select = ({ label, defaultValue, options, onChange }: Props) => {
//   return (
//     <fieldset className="fieldset mx-2">
//       <legend className="fieldset-legend">{label}</legend>
//       <select defaultValue={defaultValue} className="select select-sm rounded-lg w-full" onChange={onChange}>
//         {options.map(o => (
//           <option key={o}>
//             {o}
//           </option>
//         ))}
//       </select>
//     </fieldset>
//   )
// }