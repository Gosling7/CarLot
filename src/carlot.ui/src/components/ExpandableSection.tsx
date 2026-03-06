import type { ChangeEventHandler, ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  onChange: ChangeEventHandler;
}

export const ExpandableSection = ({ label, onChange, children }: Props) => {
  return (
    <div className="collapse bg-base-100 collapse-arrow border-base-300 border">
      <input type="checkbox" onChange={onChange} />
      <div className="collapse-title font-semibold">{label}</div>
      {children}
    </div>
  )
}