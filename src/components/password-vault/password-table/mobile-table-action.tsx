/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGetPasswordProps } from "@/api/password/get-password";
import TableDropdown from "@/shared/components/table/table-dropdown";
import copyToClipboard from "@/utils/copy-to-clipboard";
import { Copy01Icon, ViewIcon } from "hugeicons-react";
import { ReactNode, useState } from "react";

interface MobileTableActionProps<T> {
  tableHeaders: string[];
  item: IGetPasswordProps;
  actions: {
    name: string;
    Component: (props: T) => ReactNode;
  }[];
  handleDelete: (id: any) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MobileTableAction = ({
  item,
  actions,
  handleDelete,
}: MobileTableActionProps<any>) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const tableHeaders = ["Last used", "Password", "URL", "Security strength"];

  const actionState = [
    { open: openEdit, action: () => setOpenEdit(!openEdit) },
    { open: openView, action: () => setOpenView(!openView) },
    { open: openDelete, action: () => setOpenDelete(!openDelete) },
  ];
  const updatedAction = actions.map((item, index: number) => ({
    ...item,
    open: actionState[index].open,
    action: actionState[index].action,
  }));

  const tableData = {
    [tableHeaders[0]]: item.lastUsed ?? "",
    [tableHeaders[1]]: (
      <div className="flex items-center justify-center space-x-[10px]">
        <span>{item.password}</span>
        <div className="flex items-center ">
          <ViewIcon className="mr-[10px] size-[20px] text-primary-500 cursor-pointer" />{" "}
          <Copy01Icon
            onClick={() => copyToClipboard(item.password)}
            className=" text-primary-500 size-[20px] cursor-pointer"
          />
        </div>
      </div>
    ),
    [tableHeaders[2]]: (
      <a
        className=" text-primary-500 underline"
        href={item.url}
        target="_blank"
      >
        {item.url}
      </a>
    ),
    [tableHeaders[3]]: item.passwordStrength ?? "",
  };

  return (
    <TableDropdown
      item={tableData}
      data={item}
      tableHeaders={tableHeaders}
      actions={updatedAction}
      handleDelete={handleDelete}
    />
  );
};

export default MobileTableAction;
