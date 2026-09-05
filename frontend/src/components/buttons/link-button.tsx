import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { buttonVariants, type Variant } from "./button-variants";

type LinkButtonProps = {
  children?: ReactNode;
  variant?: Variant;
  to: string;
  onClick?: () => void;
  className?: string;
};

export function LinkButton({
  children,
  variant = "secondary",
  onClick,
  to,
  className,
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={buttonVariants(variant, className)}
    >
      {children}
    </Link>
  );
}
