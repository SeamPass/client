import { Switch } from "@/components/ui/switch";
import Text from "@/shared/components/typography";

interface CustomMemorablePasswordProps {
  options: {
    text: string;
    isTrue: boolean;
  }[];
  setOptions: React.Dispatch<
    React.SetStateAction<
      {
        text: string;
        isTrue: boolean;
      }[]
    >
  >;
}

const CustomMemorablePassword: React.FC<CustomMemorablePasswordProps> = ({
  setOptions,
  options,
}) => {
  const handleChecked = (index: number) => {
    setOptions((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, isTrue: !item.isTrue } : item
      )
    );
  };

  return (
    <div className="mt-4">
      <div className="h-[0.5px] border-b-grey-200 w-[60%]" />
      {options.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-[10px] border-b-[0.5px] border-b-grey-200"
        >
          <Text size="normal" variant="primary-200">
            {item.text}
          </Text>
          <Switch
            checked={item.isTrue}
            onCheckedChange={() => handleChecked(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomMemorablePassword;
