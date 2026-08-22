import { type ReactNode } from "react";

const variants = {
  primary:
    "bg-primary border-surface border-2 p-2 rounded-lg cursor-pointer hover:bg-primary-hover transition-transform hover:scale-105 text-surface",
  secondary:
    "items-center border-primary border-2 rounded-lg p-3 hover:border-primary-hover transition-transform hover:scale-105",
};

export type Variant = "primary" | "secondary";

type ButtonProps = {
  children?: ReactNode;
  variant?: Variant;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string
};

export function Button({ children, variant = "primary", type = "submit", onClick, className }: ButtonProps) {
  return (
    <button
      type={type}
      className={variants[variant] + " " + className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
