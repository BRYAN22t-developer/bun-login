import { type ReactNode } from "react";
import { buttonVariants, type Variant } from "./button-variants";

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
      className={buttonVariants(variant, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
