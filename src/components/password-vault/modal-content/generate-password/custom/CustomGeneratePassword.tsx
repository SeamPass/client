import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Text from "@/shared/components/typography";
import { InformationDiamondIcon } from "hugeicons-react";
import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CustomGeneratePasswordProps = {
  options: { [key: string]: boolean };
  onCheckedChange: (options: string) => void;
};

interface TooltipInfo {
  header: string;
  message: string;
}

interface TooltipsInfo {
  [option: string]: TooltipInfo;
}

const CustomGeneratePassword: FC<CustomGeneratePasswordProps> = ({
  options,
  onCheckedChange,
}) => {
  const tooltipsInfo: TooltipsInfo = {
    "Use number": {
      header: "Numeric Characters",
      message: "Add numbers (0-9) to strengthen the password.",
    },
    "Use letter": {
      header: "Letters",
      message: "Use a mix of upper (A-Z) and lower (a-z) case letters.",
    },
    "Use characters": {
      header: "Special Characters",
      message: "Add symbols (e.g., @, #, $) for extra security.",
    },
    "Use capitals": {
      header: "Capital Letters",
      message: "Capitals (A-Z) to strengthen the password.",
    },
  };

  return (
    <div className="mt-4">
      <div className="border-b-0.5 border-b-grey-200 w-[60%]" />
      {Object.keys(options).map((option, index, arr) => (
        <div
          key={index}
          className={cn(
            "flex items-center justify-between py-[10px] border-b border-b-grey-200",
            index === arr.length - 1 && "border-none"
          )}
        >
          <div className="flex items-center gap-1">
            <Text size="normal" variant="primary-200">
              {option}
            </Text>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InformationDiamondIcon className="size-5 text-[#197CE2] cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent
                  avoidCollisions={true}
                  className=" relative bg-primary-100 "
                >
                  <Text size="md" weight="medium" className="text-white">
                    {tooltipsInfo[option].header}
                  </Text>
                  <Text
                    weight="regular"
                    className="text-white text-[12px] max-w-[150px] w-full"
                  >
                    {tooltipsInfo[option].message}
                  </Text>
                  <div className="bg-primary-100 w-[14px] h-2 absolute -bottom-[1px] -translate-x-[50%] left-[50%] rotate-45" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch
            checked={options[option]}
            onCheckedChange={() => onCheckedChange(option)}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomGeneratePassword;
