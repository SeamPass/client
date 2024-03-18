import { ButtonClasses } from "../@types";

export default <ButtonClasses>{
  base: "h-[48px] w-full rounded-[8px] leading-[24px]  duration-200 transition-all font-medium",
  variant: {
    primary:
      "px-4 py-[10.50px]   justify-center bg-primary-100 hover:bg-primary-200 active:bg-primary-400 items-center text-white text-[16px]    transition-all",
    secondary:
      "border-[1px] border-solid border-primary-100 text-primary-100  hover:bg-[#F0FFEE] transition duration-300 ease-in-out ",
    tertiary:
      "bg-transparent text-grey-100  border border-grey-200 rounded-[8px] hover:bg-grey-400 duration-200 transition-all ",
    error: "bg-error-100  text-[#fff] transition duration-300 ease-in-out ",
  },
  size: {
    sm: "text-[14px] md:text-[16px]",
    md: "text-[16px]",
  },
};
