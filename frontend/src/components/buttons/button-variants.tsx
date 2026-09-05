import { twMerge } from "tailwind-merge";

const variants = {
  primary:
    "bg-primary border-surface border-2 p-2 rounded-lg cursor-pointer hover:bg-primary-hover transition-transform hover:scale-105 text-surface",
  secondary:
    "items-center border-primary border-2 rounded-lg p-3 cursor-pointer hover:border-primary-hover transition-transform hover:scale-105",
  success:
    "bg-success border-surface border-2 p-2 rounded-lg cursor-pointer hover:bg-success-hover transition-transform hover:scale-105 text-surface",
  warning:
    "bg-warning border-surface border-2 p-2 rounded-lg cursor-pointer hover:bg-warning-hover transition-transform hover:scale-105 text-surface",
  danger:
    "bg-danger border-surface border-2 p-2 rounded-lg cursor-pointer hover:bg-danger-hover transition-transform hover:scale-105 text-surface",
};

export type Variant = keyof typeof variants

export function buttonVariants(variant: Variant, className?: string) {
  return twMerge(variants[variant], className)
}
