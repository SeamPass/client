import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { useState } from "react";
import EyeIcon from "@/assets/icons/eyeIcon.svg?react";
import CloseEyeIcon from "@/assets/icons/closeEyeIcone.svg?react";
import ComponentVisibility from "@/shared/components/componentVisibility";
import ValidateIcon from "@/assets/icons/validateIcon.svg?react";
import TickIcon from "@/assets/icons/tick.svg?react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputRightElement?: JSX.Element;
  inputLeftElement?: JSX.Element;
  icon?: boolean;
  containerStyles?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  copyIcon?: JSX.Element;
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    formikOnBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  }
>(
  (
    {
      className,
      type,
      inputRightElement,
      label,
      icon,
      error,
      copyIcon,
      formikOnBlur,
      inputLeftElement,
      containerStyles,
      ...props
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(false); // Update local focus state
      if (formikOnBlur) {
        formikOnBlur(e); // Call Formik's onBlur if provided
      }
    };

    return (
      <div>
        <Label className="text-[16px] text-[#555555]" htmlFor="email">
          {label}
        </Label>

        <div className="flex-1 flex items-center">
          <div className="w-full">
            <div
              className={cn(
                `relative flex h-12 items-center rounded-md mt-[6px] w-full ring-offset-background border border-input overflow-hidden ${
                  isFocus
                    ? "ring-[3px] ring-[#DDEEFF] ring-offset-[1px] outline-none"
                    : null
                }`,
                error && "ring-error-200",
                error && "border border-error-100",
                containerStyles
              )}
            >
              {inputLeftElement && (
                <p className="pl-3 text-[#141B34]">{inputLeftElement}</p>
              )}
              <input
                type={
                  type === "password" ? (isShow ? "text" : "password") : type
                }
                className={cn(
                  "flex h-full w-full relative rounded-md bg-transparent px-4 py-2 text-[16px] text-primary-400 outline-none  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#D6D6D6] disabled:cursor-not-allowed disabled:opacity-50",
                  className
                )}
                ref={ref}
                onFocus={() => setIsFocus(true)}
                onBlur={handleBlur}
                {...props}
              />

              {inputRightElement && (
                <p className="pr-3 text-[#141B34]">{inputRightElement}</p>
              )}
              {icon && (
                <p className="p-4 absolute top-0 right-0">
                  {error ? <ValidateIcon /> : <TickIcon />}
                </p>
              )}
              <ComponentVisibility appear={type === "password"}>
                <div
                  className="h-full cursor-pointer"
                  onClick={() => setIsShow(!isShow)}
                >
                  <p className="p-4 text-[#141B34]">
                    {isShow ? <EyeIcon /> : <CloseEyeIcon />}
                  </p>
                </div>
              </ComponentVisibility>
            </div>
            <p className=" text-error-100 mt-[6px] font-normal text-sm">
              {error}
            </p>
          </div>
          {copyIcon && <span className="ml-2">{copyIcon}</span>}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
