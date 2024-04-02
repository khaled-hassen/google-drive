import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils.ts";

type Props = {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
};

const Modal: React.FC<Props> = ({ title, isOpen, className, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed left-0 top-0 z-[999] flex size-full items-center justify-center bg-black/60 p-10">
      <div
        className={cn(
          "flex max-w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-2xl transition-colors dark:bg-dark",
          className,
        )}
      >
        <p className="text-center text-4xl font-bold">{title}</p>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
