/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGetWifiProps } from "@/api/wifi/get-wifi";
import TableDropdown from "@/shared/components/table/table-dropdown";
import { ReactNode, useState } from "react";

interface MobileTableActionProps<T> {
  tableHeaders: string[];
  item: IGetWifiProps;
  actions: {
    name: string;
    Component: (props: T) => ReactNode;
  }[];
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MobileTableAction = ({
  item,
  actions,
  id,
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

  const tableData = {
    [tableHeaders[0]]: item.updatedAt ?? "",
  };

  return (
    <TableDropdown
      item={tableData}
      tableHeaders={tableHeaders}
      actions={updatedAction}
      id={id}
    />
  );
};
//
export default MobileTableAction;
