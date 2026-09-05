import type { ReactNode } from "react";
import { buttonVariants, type Variant } from "./button-variants";

type AnchorButtonProps = {
  children?: ReactNode;
  variant?: Variant;
  href: string;
  onClick?: () => void;
  className?: string
};

export function AnchorButton({
  children,
  variant = "secondary",
  onClick,
  href,
  className
}: AnchorButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={buttonVariants(variant, className)}
    >
      {children}
    </a>
  );
}
