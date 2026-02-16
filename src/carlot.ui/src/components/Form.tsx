import type { ReactNode } from "react";

type Props = {
  header: string;
  children: ReactNode;
};

export const Form = ({ header, children }: Props) => {
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold text-center">{header}</h2>
      {children}
    </div>
  );
}
