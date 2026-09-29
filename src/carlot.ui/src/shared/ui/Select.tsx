import type { Ref } from "react";

// type Props = {
//   label: string;
//   options: any;
//   value: any;
//   onChange: (value: string) => void;
// }

// export const Select = ({ label, options, value, onChange }: Props) => {
//   const enumValues = getEnumValues(options);

//   return (
//     <fieldset className="fieldset mx-2">
//       <legend className="fieldset-legend">{label}</legend>
//       <select
//         className="select select-sm rounded-lg w-full"
//         onChange={(e) => onChange(e.target.value)}
//         value={value}
//       >
//         {enumValues.map(value => (
//           <option key={value} value={value}>
//             {value}
//           </option>
//         ))}
//       </select>
//     </fieldset>
//   )
// }

type Props = {
  label: string;
  options: Record<string, string>;
  value: string;
  onChange: (value: string) => void;
}

export const Select = ({ label, options, value, onChange }: Props) => {
  const enumValues = getEnumValues(options);

  return (
    <fieldset className="fieldset mx-2">
      <legend className="fieldset-legend">{label}</legend>
      <select
        className="select select-sm rounded-lg w-full"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {enumValues.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </fieldset>
  )
}

type SelectProps = {
  label: string;
  options: Record<string, string>;
  emptyLabel?: string;
  ref?: Ref<HTMLSelectElement>;
}

export const SelectRHF = ({ label, options, emptyLabel, ref }: SelectProps) => {
  const enumValues = getEnumValues(options);

  return (
    <fieldset className="fieldset mx-2">
      <legend className="fieldset-legend">{label}</legend>
      <select
        className="select select-sm rounded-lg w-full"
        ref={ref}
      >
        {emptyLabel && <option value="">{emptyLabel}</option>}
        {enumValues.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </fieldset>
  )
};

export default Select;

function getEnumValues<T extends Record<string, string>>(
  enumObject: T
): string[] {
  return Object.values(enumObject);
}
