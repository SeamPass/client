import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Text from "@/shared/components/typography";
import { FC } from "react";

type CustomGeneratePasswordProps = {
  options: { [key: string]: boolean };
  onCheckedChange: (options: string) => void;
};

const CustomGeneratePassword: FC<CustomGeneratePasswordProps> = ({
  options,
  onCheckedChange,
}) => {
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
          <Text size="normal" variant="primary-200">
            {option}
          </Text>
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
