import EmptyIcon from "@/assets/icons/empty.svg?react";
import Text from "../typography";

interface EmptyProps {
  title: string;
}
const Empty: React.FC<EmptyProps> = ({ title }) => {
  return (
    <div className="mt-7 md:mt-16 h-full flex-col flex m-auto">
      <EmptyIcon />
      <Text className="mt-10 text-[1rem]" variant="primary">
        {title}
      </Text>
    </div>
  );
};

export default Empty;
