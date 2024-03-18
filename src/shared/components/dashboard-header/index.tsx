import { ReactNode } from "react";
import Text from "../typography";
import Header from "../typography/Header";
// import { Input } from "@/components/ui/input";
// import { Search01Icon } from "hugeicons-react";

interface DashboardHeaderProps {
  title: string;
  subTitle: string;
  children: ReactNode;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <Header variant="primary" size="lg" weight="medium">
            {title}
          </Header>
          <Text size="sm" variant="primary">
            {subTitle}
          </Text>
        </div>
        <div className="mt-7 md:mt-0">{children}</div>
      </div>
      {/* <Input
        inputLeftElement={<Search01Icon className=" size-4" />}
        containerStyles=" w-[350px] ring-0 ring-offset-0 outline-none mt-6"
      /> */}
    </div>
  );
};

export default DashboardHeader;
