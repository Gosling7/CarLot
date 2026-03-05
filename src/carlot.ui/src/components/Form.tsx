import type { ReactNode, SubmitEventHandler } from "react";

type Props = {
  header: string;
  children: ReactNode;
  onSubmit: SubmitEventHandler;
};

export const Form = ({ header, children, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <h2 className="text-2xl font-bold text-center">{header}</h2>
      {children}
    </form>
  );
}
