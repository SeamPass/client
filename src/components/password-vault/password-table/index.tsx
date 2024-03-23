/* eslint-disable @typescript-eslint/no-explicit-any */
import TableComponent from "@/shared/components/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/shared/components/button";
import DashboardHeader from "@/shared/components/dashboard-header";
import { Add01Icon, Copy01Icon, ViewIcon } from "hugeicons-react";
import AddPassword from "../modal-content/add-password";
import { useContext, useEffect, useState } from "react";
import useGetUserPasswordQuery, {
  IGetPasswordProps,
} from "@/api/password/get-password";
import { Checkbox } from "@/components/ui/checkbox";
import Text from "@/shared/components/typography";
import EditPassword from "../modal-content/edit-password";
import ViewPassword from "../modal-content/view-password";
import copyToClipboard from "@/utils/copy-to-clipboard";
import DesktopTableAction from "./desktop-table-action";
import MobileTableAction from "./mobile-table-action";
import usePaginate from "@/hooks/usePaginate";
import { handlePasswordStrengthColors } from "@/utils/passwordStrengthColors";
import DeleteModal from "@/shared/components/modal/delete-modal";
import { GlobalContext } from "@/context/globalContext";
import { decryptUserData } from "@/utils/EncryptDecrypt";

const PasswordTable = () => {
  const { encryptionKey } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [isTableDataSelected, setIsTableDataSelected] = useState<string[]>([]);
  const [showMobileTable, setShowMobileTable] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const { data } = useGetUserPasswordQuery(pageCount);
  const { hasNextPage, hasPrevPage, totalPages, currentPage, handlePageCount } =
    usePaginate(data);
  const [passwordVisibility, setPasswordVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [decryptedData, setDecryptedData] = useState<any>([]);

  const tableHeaders = [
    "Website name",
    "Username/Email",
    "Password",
    "URL",
    "Security strength",
    "Action",
  ];

  useEffect(() => {
    const decryptAllData = async () => {
      if (!data?.data || !encryptionKey) return;

      const promises = data?.data?.map(async (item: any) => {
        const decryptedUsername = await decryptUserData(
          item.username.encUsername,
          item.username.iv,
          encryptionKey
        );
        const decryptedPassword = await decryptUserData(
          item.password.encPassword,
          item.password.iv,
          encryptionKey
        );
        return {
          ...item,
          username: decryptedUsername,
          password: decryptedPassword,
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

  const togglePasswordVisibility = (itemId: string) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const actions = [
    {
      name: "edit",
      Component: EditPassword,
    },
    {
      name: "view",
      Component: ViewPassword,
    },

    { name: "delete", Component: DeleteModal },
  ];

  const tableData = decryptedData?.map((item: IGetPasswordProps) => ({
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
          {item.websiteName}
        </Text>
      </div>
    ),
    [tableHeaders[1]]: item.username,
    [tableHeaders[2]]: (
      <div className="flex items-center justify-center space-x-[10px]">
        <span>{passwordVisibility[item.id] ? item.password : "*****"}</span>
        <div className="flex items-center ">
          <ViewIcon
            onClick={() => togglePasswordVisibility(item.id)}
            className="mr-[10px] size-[20px] text-primary-500 cursor-pointer"
          />
          <Copy01Icon
            onClick={() => copyToClipboard(item.password)}
            className=" text-primary-500 size-[20px] cursor-pointer"
          />
        </div>
      </div>
    ),
    [tableHeaders[3]]: (
      <a
        className=" text-primary-500 underline"
        href={item.url}
        target="_blank"
      >
        {item.url}
      </a>
    ),
    [tableHeaders[4]]: (
      <span
        style={{
          color: handlePasswordStrengthColors(
            item?.passwordStrength?.toLowerCase()
          ),
        }}
      >
        {item.passwordStrength}
      </span>
    ),
    [tableHeaders[5]]: (
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
        title="Password Vault"
        subTitle="Find all your stored password in one place."
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="!w-[161px] text-[#F6FAFF] flex items-center justify-center bg-secondary-100 gap-2">
              <Add01Icon className=" size-4 font-medium" /> Add Password
            </Button>
          </DialogTrigger>
          <AddPassword open={open} setOpen={setOpen} />
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