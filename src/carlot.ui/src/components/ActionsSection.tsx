import type { ReactNode } from "react";
import { Section } from "./Section";

type Props = {
  header: string;
  children: ReactNode;
};

export const ActionsSection = ({ header, children }: Props) => {
  return (
    <Section header={header}>
      <div className="flex gap-4">
        {children}
      </div>
    </Section>
  );
}
