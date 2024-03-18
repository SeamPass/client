/* eslint-disable @typescript-eslint/no-explicit-any */
import TableComponent from "@/shared/components/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/shared/components/button";
import DashboardHeader from "@/shared/components/dashboard-header";
import { Add01Icon } from "hugeicons-react";
import { useContext, useEffect, useState } from "react";
import DesktopTableAction from "./desktop-table-action";
import MobileTableAction from "./mobile-table-action";
import usePaginate from "@/hooks/usePaginate";
import DeleteModal from "@/shared/components/modal/delete-modal";
import { GlobalContext } from "@/context/globalContext";
import { decryptUserData } from "@/utils/EncryptDecrypt";
import EditSecret from "../secret-modal-content/edit-secret";
import ViewSecret from "../secret-modal-content/view-secret";
import AddSecret from "../secret-modal-content/add-secret";
import useGetSecretQuery, { IGetSecretProps } from "@/api/secret/get-secret";
import { Checkbox } from "@/components/ui/checkbox";
import Text from "@/shared/components/typography";

const PasswordTable = () => {
  const { encryptionKey } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [isTableDataSelected, setIsTableDataSelected] = useState<string[]>([]);
  const [showMobileTable, setShowMobileTable] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const { data } = useGetSecretQuery(pageCount);
  const { hasNextPage, hasPrevPage, totalPages, currentPage, handlePageCount } =
    usePaginate(data);
  const [decryptedData, setDecryptedData] = useState<any>([]);

  const tableHeaders = ["Title name", "Date created", "Last updated", "Action"];
  console.log(data);
  useEffect(() => {
    const decryptAllData = async () => {
      if (!data?.data || !encryptionKey) return;

      const promises = data?.data?.map(async (item: any) => {
        const decryptedNote = await decryptUserData(
          item.note.encNote,
          item.note.iv,
          encryptionKey
        );

        return {
          ...item,
          note: decryptedNote,
        };
      });

      Promise.all(promises).then(setDecryptedData);
    };

    decryptAllData();
  }, [data, encryptionKey]);

  const handleCheckboxChange = (itemId: string) => {
    setIsTableDataSelected((prevState: string[]) => {
      const isAlreadySelected = prevState.includes(itemId);
      if (isAlreadySelected) {
        return prevState.filter((id: string) => id !== itemId);
      } else {
        return [...prevState, itemId];
      }
    });
  };

  const actions = [
    {
      name: "edit",
      Component: EditSecret,
    },
    {
      name: "view",
      Component: ViewSecret,
    },

    { name: "delete", Component: DeleteModal },
  ];

  const tableData = decryptedData?.map((item: IGetSecretProps) => ({
    ...item,
    [tableHeaders[0]]: (
      <div className="flex md:items-center justify-start md:justify-center gap-2">
        <Checkbox
          onCheckedChange={() => handleCheckboxChange(item.id)}
          indicatorStyle="size-3"
          className=" size-[16px]"
          checked={isTableDataSelected.includes(item.id)}
        />
        <Text size="sm" variant="primary" weight="regular">
          {item.title}
        </Text>
      </div>
    ),
    [tableHeaders[1]]: item.createdAt,
    [tableHeaders[2]]: item.updatedAt,
    [tableHeaders[3]]: (
      <DesktopTableAction
        id={item.id}
        setShowMobileTable={setShowMobileTable}
        actions={actions}
        setIsTableDataSelected={setIsTableDataSelected}
      />
    ),
    MobileTable: (
      <MobileTableAction
        item={item}
        id={item.id}
        tableHeaders={tableHeaders}
        actions={actions}
      />
    ),
  }));

  return (
    <div className="mt-[163px] md:mt-[210px]">
      <DashboardHeader
        title="Secret Vault"
        subTitle="Find all your stored password in one place."
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="!w-fit h-[40px] p-[10px] text-[#F6FAFF] flex items-center justify-center bg-secondary-100 gap-2">
              <Add01Icon className=" size-4 text-[#F6FAFF] font-medium" /> Add
            </Button>
          </DialogTrigger>
          <AddSecret open={open} setOpen={setOpen} />
        </Dialog>
      </DashboardHeader>

      <TableComponent
        tableHeaders={tableHeaders}
        tableData={tableData}
        showMobileTable={showMobileTable}
        isTableDataSelected={isTableDataSelected}
        setIsTableDataSelected={setIsTableDataSelected}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageCount={handlePageCount}
        setPageCount={setPageCount}
      />
    </div>
  );
};

export default PasswordTable;
