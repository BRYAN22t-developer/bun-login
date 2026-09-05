import { twMerge } from "tailwind-merge";

const variants = {
  primary:
    "bg-primary border-surface border-2 p-2 rounded-lg cursor-pointer hover:bg-primary-hover transition-transform hover:scale-105 text-surface",
  secondary:
    "items-center border-primary border-2 rounded-lg p-3 cursor-pointer hover:border-primary-hover transition-transform hover:scale-105",
};

export type Variant = keyof typeof variants

export function buttonVariants(variant: Variant, className?: string) {
  return twMerge(variants[variant], className)
}
