/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog } from "@/components/ui/dialog";
import Text from "../../typography";
import { ReactNode } from "react";

interface TableDropdownProps<T> {
  tableHeaders: string[];
  item: any;
  actions: {
    name: string;
    Component: (props: T) => ReactNode;
    open: boolean;
    action: () => void;
  }[];
  id: string;
}

const TableDropdown: React.FC<TableDropdownProps<any>> = ({
  id,
  item,
  tableHeaders,
  actions,
}) => {
  return (
    <div className="w-full px-4 pt-[14px]  space-y-4">
      {tableHeaders.map((title: string) => (
        <div className="flex items-center justify-between">
          <Text weight="medium" size="sm" variant="primary">
            {title}
          </Text>
          <Text size="sm" variant="primary">
            {item[title]}
          </Text>
        </div>
      ))}
      <div className="flex items-center justify-evenly py-2 border-t border-grey-200">
        {actions.map(({ Component, ...act }) => (
          <>
            <Dialog open={act.open} onOpenChange={act.action}>
              <Component id={id} open={act.open} setOpen={act.action} />
            </Dialog>
            <Text
              className=" cursor-pointer"
              onClick={() => act.action()}
              size="sm"
              variant="primary"
            >
              {act.name}
            </Text>
          </>
        ))}
      </div>
    </div>
  );
};

export default TableDropdown;
