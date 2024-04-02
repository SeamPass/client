/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: any;
  formikOnBlur?: any;
  containerStyles?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, error, label, formikOnBlur, containerStyles, ...props },
    ref
  ) => {
    const [isFocus, setIsFocus] = React.useState(false);

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocus(false);
      if (formikOnBlur) {
        formikOnBlur(e);
      }
    };
    return (
      <div>
        <Label className="text-[16px] text-[#555555] " htmlFor="text">
          {label}
        </Label>

        <div
          className={cn(
            `relative flex min-h-[80px] items-center rounded-md mt-[6px]  w-full ring-offset-background border border-input overflow-hidden ${
              isFocus
                ? "ring-[3px] ring-[#DDEEFF] ring-offset-[1px] outline-none"
                : null
            }`,
            error && "ring-error-200",
            error && "border border-error-100",
            containerStyles
          )}
        >
          <textarea
            className={cn(
              "flex flex-col flex-1 min-h-[80px] resize-none rounded-md  bg-transparent px-3 py-2  text-base  placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            onFocus={() => setIsFocus(true)}
            onBlur={handleBlur}
            ref={ref}
            {...props}
          />
        </div>
        <p className=" text-error-100 font-normal mt-[6px]  text-sm">{error}</p>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
