"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out",
        className
      )}
      {...props}
    />
  );
}

export interface SheetContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  side?: "left" | "right";
}

export function SheetContent({ className, side = "left", children, ...props }: SheetContentProps) {
  const sideClasses = side === "left" ? "left-0 data-[state=open]:slide-in-from-left" : "right-0 data-[state=open]:slide-in-from-right";
  return (
    <DialogPrimitive.Portal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-0 z-50 h-dvh w-80 bg-background shadow-soft border data-[state=open]:animate-in data-[state=closed]:animate-out",
          sideClasses,
          className
        )}
        {...props}
      >
        <SheetClose className="absolute right-4 top-4 rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-none" aria-label="Close">
          <X size={16} />
        </SheetClose>
        <div className="p-5">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold", className)} {...props} />;
}
