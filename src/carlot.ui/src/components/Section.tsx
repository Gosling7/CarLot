import type { ReactNode } from "react";

type Props = {
  header: string;
  children: ReactNode;
};

export const Section = ({ header, children }: Props) => {
  return (
    <div className="bg-base-100 p-6 rounded-xl border border-base-300">
      <h3 className="font-semibold mb-3">{header}</h3>
      {children}
    </div>
  );
}
