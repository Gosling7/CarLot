import type { ComponentProps } from "react";

type ButtonProps = {
  label: string;
  type?: ComponentProps<"button">["type"];
  onClick?: () => void;
}

export const Button = ({ label, type = "button", onClick }: ButtonProps) => {
  return (
    <button
      className="btn rounded-xl"
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
