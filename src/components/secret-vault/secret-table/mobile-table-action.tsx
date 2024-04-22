/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGetSecretProps } from "@/api/secret/get-secret";
import TableDropdown from "@/shared/components/table/table-dropdown";
import { convertDate } from "@/utils/convertDateFormat";
import { ReactNode, useState } from "react";

interface MobileTableActionProps<T> {
  tableHeaders: string[];
  item: IGetSecretProps;
  actions: {
    name: string;
    Component: (props: T) => ReactNode;
  }[];
  handleDelete: (id: any, callback: () => void) => Promise<void>;
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

  const tableHeaders = ["Last updated"];

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

  const updatedAt = convertDate(item.updatedAt);
  const createdAt = convertDate(item.createdAt);
  const editedItem = { ...item, updatedAt, createdAt };

  const tableData = {
    [tableHeaders[0]]: editedItem.updatedAt ?? "",
  };

  return (
    <TableDropdown
      item={tableData}
      tableHeaders={tableHeaders}
      actions={updatedAction}
      data={item}
      handleDelete={handleDelete}
    />
  );
};
//
export default MobileTableAction;
