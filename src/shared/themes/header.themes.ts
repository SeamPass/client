import { TypographyClasses } from "../@types";

export default <TypographyClasses>{
  variant: {
    ["primary-100"]: "text-primary-300",
    ["primary-200"]: "text-white",
  },
  size: {
    sm: "text-[16px] md:text-[18px] ",
    md: "text-[16px] md:text-[20px]",
    lg: "text-[16px] md:text-[24px]",
    xl: "text-[24px] md:text-[32px] xl:text-[40px] ",
  },
  weight: {
    regular: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  },
  alignment: {
    center: "text-center mx-auto",
    left: "text-left mr-auto",
    right: "text-right ml-auto",
  },
  fontStyle: {
    italic: "italic",
  },
};
