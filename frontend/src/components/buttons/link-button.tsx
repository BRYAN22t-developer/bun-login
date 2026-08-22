import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-primary border-surface border-2 p-2 rounded-lg cursor-pointer hover:bg-primary-hover transition-transform hover:scale-105",
  secondary:
    "items-center border-primary border-2 rounded-lg p-3 hover:border-primary-hover transition-transform hover:scale-105",
};

export type Variant = "primary" | "secondary";

type LinkButtonProps = {
  children?: ReactNode;
  variant?: Variant;
  to: string;
  onClick?: () => void;
  className?: string
};

export function LinkButton({
  children,
  variant = "secondary",
  onClick,
  to,
  className,
}: LinkButtonProps) {
  return (
    <Link to={to} onClick={onClick} className={variants[variant] + " " + className}>
      {children}
    </Link>
  );
}
