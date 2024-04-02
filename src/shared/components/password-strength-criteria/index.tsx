import { HelpCircleIcon } from "hugeicons-react";
import Text from "../typography";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PasswordStrengthCriteria = () => {
  return (
    <div className="flex items-center gap-2 my-[22px]">
      <Text weight="medium" size="sm">
        Password strength criteria
      </Text>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircleIcon className="size-5 text-[#197CE2] cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="center"
            avoidCollisions={true}
            className=" relative bg-primary-100 "
          >
            <Text
              weight="regular"
              className="text-white text-[12px] max-w-[230px]"
            >
              <span className=" font-semibold text-sm">Tips:</span> For a strong
              password, use at least 12 characters, combining letters, numbers,
              and special symbols. Make sure the password strength indicator
              shows 'Strong' before using your new password.
            </Text>

            <div className="bg-primary-100 w-[14px] h-2 absolute -top-[2px] -translate-x-[50%] left-[50%] -rotate-45" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PasswordStrengthCriteria;
