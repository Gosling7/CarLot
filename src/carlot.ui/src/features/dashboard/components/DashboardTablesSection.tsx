import React, { type ReactNode } from "react"

type Props = {
  children: ReactNode;
}

export const DashboardTablesSection = ({ children }: Props) => {
  const count = React.Children.count(children);

  return (
    <div className={`grid gap-6 grid-cols-1 ${count > 1 ? "xl:grid-cols-2" : "xl:grid-cols-1"}`}>
      {children}
    </div>
  );
}
