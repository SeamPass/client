import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <>
        <Label className="text-[16px] text-[#555555] " htmlFor="text">
          {label}
        </Label>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#DDEEFF] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
