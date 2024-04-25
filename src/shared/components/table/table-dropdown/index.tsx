/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog } from "@/components/ui/dialog";
import Text from "../../typography";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableDropdownProps<T> {
  tableHeaders: string[];
  item: any;
  actions: {
    name: string;
    Component: (props: T) => ReactNode;
    open: boolean;
    action: () => void;
  }[];

  handleDelete: (id: any, callback: () => void) => Promise<void>;
  data: any;
}

const TableDropdown: React.FC<TableDropdownProps<any>> = ({
  data,
  item,
  tableHeaders,
  actions,
  handleDelete,
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
              <Component
                handleDelete={handleDelete}
                data={data}
                open={act.open}
                setOpen={act.action}
              />
            </Dialog>

            <Text
              className={cn(
                " cursor-pointer capitalize",
                act.name.toLowerCase() === "delete"
                  ? " text-error-100"
                  : "text-grey-100"
              )}
              onClick={() => act.action()}
              size="sm"
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
