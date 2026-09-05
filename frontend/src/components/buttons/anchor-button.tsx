import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary:
    "bg-primary border-surface border-2 p-2 rounded-lg cursor-pointer hover:bg-primary-hover transition-transform hover:scale-105 text-surface",
  secondary:
    "items-center border-primary border-2 rounded-lg p-3 cursor-pointer hover:border-primary-hover transition-transform hover:scale-105",
};

export type Variant = "primary" | "secondary";

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
      className={twMerge(variants[variant], className)}
    >
      {children}
    </a>
  );
}
