import type { ReactNode } from "react";

type Props = {
  header: string;
  children: ReactNode;
};

export const Section = ({ header, children }: Props) => {
  return (
    <div className="bg-base-100 p-4 rounded-xl">
      <h3 className="font-semibold mb-3">{header}</h3>
      {children}
    </div>
  );
}
