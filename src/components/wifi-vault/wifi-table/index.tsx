/* eslint-disable @typescript-eslint/no-explicit-any */
import TableComponent from "@/shared/components/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/shared/components/button";
import DashboardHeader from "@/shared/components/dashboard-header";
import { Add01Icon, Copy01Icon, ViewIcon } from "hugeicons-react";
import { useContext, useEffect, useState } from "react";
import usePaginate from "@/hooks/usePaginate";
import DeleteModal from "@/shared/components/modal/delete-modal";
import { GlobalContext } from "@/context/globalContext";
import { decryptUserData } from "@/utils/EncryptDecrypt";
import { Checkbox } from "@/components/ui/checkbox";
import Text from "@/shared/components/typography";
import ViewWifi from "../wifi-modal/view-wifi";
import DesktopTableAction from "./desktop-table-action";
import MobileTableAction from "./mobile-table-action";
import AddWifi from "../wifi-modal/add-wifi";
import useGetWifiQuery, { IGetWifiProps } from "@/api/wifi/get-wifi";
import EditWifi from "../wifi-modal/edit-wifi/edit-wifi";
import { convertDate } from "@/utils/convertDateFormat";
import copyToClipboard from "@/utils/copy-to-clipboard";
import useWifiDeleteMutation from "@/api/wifi/delete-wifi";
import useDeleteMultipleWifiMutation from "@/api/wifi/delete-multiple-wifi";
import apiMessageHelper from "@/helpers/apiMessageHelper";

const WifiTable = () => {
  const { encryptionKey } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [isTableDataSelected, setIsTableDataSelected] = useState<string[]>([]);
  const [showMobileTable, setShowMobileTable] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [search, setSearch] = useState<string>("");
  const { data } = useGetWifiQuery(pageCount, search);
  const { hasNextPage, hasPrevPage, totalPages, currentPage, handlePageCount } =
    usePaginate(data);
  const [decryptedData, setDecryptedData] = useState<any>([]);
  const { mutateAsync } = useWifiDeleteMutation();
  const { mutateAsync: deleteMultiple } = useDeleteMultipleWifiMutation();
  const [openModal, setOpenModal] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const tableHeaders = ["Wifi name", "Wifi password", "Date created", "Action"];
  console.log(search);
  useEffect(() => {
    const decryptAllData = async () => {
      if (!data?.data || !encryptionKey) return;

      const promises = data?.data?.map(async (item: any) => {
        const decryptedNote = await decryptUserData(
          item.wifiPassword.encWifiPassword,
          item.wifiPassword.iv,
          encryptionKey
        );

        return {
          ...item,
          wifiPassword: decryptedNote,
        };
      });

      Promise.all(promises).then(setDecryptedData);
    };

    decryptAllData();
  }, [data, encryptionKey]);

  const handleCheckboxChange = (item: IGetWifiProps) => {
    setIsTableDataSelected((prevState: any) => {
      const isAlreadySelected = prevState.find(
        (data: IGetWifiProps) => data?.id === item?.id
      );
      if (isAlreadySelected) {
        return prevState.filter((data: IGetWifiProps) => data?.id !== item?.id);
      } else {
        return [...prevState, item];
      }
    });
  };

  const togglePasswordVisibility = (itemId: string) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleDelete = async (id: any, callback: () => void) => {
    console.log(id);
    const response =
      isTableDataSelected.length > 0
        ? await deleteMultiple({ wifiIds: id })
        : await mutateAsync(id);
    const { message, success } = response;
    apiMessageHelper({
      message,
      success,
      onSuccessCallback: () => {
        setIsTableDataSelected([]);
        callback();
      },
    });
  };

  const actions = [
    {
      name: "edit",
      Component: EditWifi,
    },
    {
      name: "view",
      Component: ViewWifi,
    },

    { name: "delete", Component: DeleteModal },
  ];

  const tableData = decryptedData?.map((item: IGetWifiProps) => ({
    ...item,
    [tableHeaders[0]]: (
      <div className="flex md:items-center justify-start md:justify-center gap-2">
        <Checkbox
          onCheckedChange={() => handleCheckboxChange(item)}
          indicatorStyle="size-3"
          className=" size-[16px]"
          checked={
            !!isTableDataSelected.find((data: any) => data.id === item.id)
          }
        />
        <Text size="sm" variant="primary" weight="regular">
          {item.wifiName}
        </Text>
      </div>
    ),
    [tableHeaders[1]]: (
      <div className="flex items-center justify-center space-x-[10px]">
        <span>{passwordVisibility[item.id] ? item.wifiPassword : "*****"}</span>
        <div className="flex items-center ">
          <ViewIcon
            onClick={() => togglePasswordVisibility(item.id)}
            className="mr-[10px] size-[20px] text-primary-500 cursor-pointer"
          />
          <Copy01Icon
            onClick={() => copyToClipboard(item.wifiPassword)}
            className=" text-primary-500 size-[20px] cursor-pointer"
          />
        </div>
      </div>
    ),
    [tableHeaders[2]]: convertDate(item.createdAt),
    [tableHeaders[3]]: (
      <DesktopTableAction
        item={item}
        setShowMobileTable={setShowMobileTable}
        actions={actions}
        setIsTableDataSelected={setIsTableDataSelected}
        handleDelete={handleDelete}
      />
    ),
    MobileTable: (
      <MobileTableAction
        item={item}
        tableHeaders={tableHeaders}
        actions={actions}
        handleDelete={handleDelete}
      />
    ),
  }));

  return (
    <div className="mt-[163px] md:mt-[210px]">
      <DashboardHeader
        title="Wifi Vault"
        subTitle="Find all your stored password in one place."
        placeholder={" Search by wifi name"}
        setSearch={(e: any) => setSearch(e?.target?.value)}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="!w-fit h-[40px] p-[10px] text-[#F6FAFF] flex items-center justify-center bg-secondary-100 gap-2">
              <Add01Icon className=" size-4 text-[#F6FAFF] font-medium" /> Add
            </Button>
          </DialogTrigger>
          <AddWifi open={open} setOpen={setOpen} />
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
        handleDelete={handleDelete}
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  );
};

export default WifiTable;
