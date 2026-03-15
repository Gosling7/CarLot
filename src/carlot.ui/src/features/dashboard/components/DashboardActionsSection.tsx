import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export const DashboardActionsSection = ({ children }: Props) => {
  return (
    <div className="flex gap-4">
      {children}
    </div>
  );
}
