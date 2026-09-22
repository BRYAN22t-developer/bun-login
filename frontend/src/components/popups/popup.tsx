import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: ReactNode;
  className?: string
};

export function Popup({ children, className }: Props) {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
        <div className={twMerge(" bg-surface p-5 rounded max-w-lg w-full m-4", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
