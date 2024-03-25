/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Text from "../typography";
import { cn } from "@/lib/utils";
import Pagination from "../pagination";
import ComponentVisibility from "../componentVisibility";
import { Cancel01Icon } from "hugeicons-react";
import Empty from "../empty";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../button";
import DeleteModal from "../modal/delete-modal";
import { IGetPasswordProps } from "@/api/password/get-password";

interface TableComponentProps {
  tableHeaders: string[];
  tableData: { [key: string]: any };
  showMobileTable: string | null;
  isTableDataSelected: string[];
  setIsTableDataSelected: React.Dispatch<React.SetStateAction<string[] | []>>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  currentPage: number;
  handlePageCount: (
    direction: "next" | "prev",
    handlePaginate: () => void
  ) => void;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
}

const TableComponent: React.FC<TableComponentProps> = ({
  tableData,
  tableHeaders,
  showMobileTable,
  isTableDataSelected,
  setIsTableDataSelected,
  hasNextPage,
  hasPrevPage,
  totalPages,
  currentPage,
  handlePageCount,
  setPageCount,
}) => {
  const [open, setOpen] = useState(false);
  const isVisibleOnMobile = (item: string) =>
    [
      tableHeaders[0],
      tableHeaders[1],
      tableHeaders[tableHeaders.length - 1],
    ].includes(item);

  const itemsToDelete = isTableDataSelected.map((id) =>
    tableData?.find((item: IGetPasswordProps) => item?.id === id)
  );

  return (
    <>
      <ComponentVisibility appear={isTableDataSelected.length > 0}>
        <div className="bg-[#FFF4F3] flex px-6 items-center justify-between h-[56px] mt-[24px] rounded-[8px]">
          <span>{isTableDataSelected.length} Logins Selected</span>
          <span className="flex items-center gap-[16px] text-[#330D0B]">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="!w-fit !h-fit text-[#F6FAFF] flex items-center justify-center  gap-2">
                  <span className="text-error-100 cursor-pointer">Delete</span>{" "}
                </Button>
              </DialogTrigger>
              <DeleteModal
                deleteData={itemsToDelete}
                open={open}
                setOpen={setOpen}
              />
            </Dialog>

            <Cancel01Icon
              onClick={() => setIsTableDataSelected([])}
              className="size-4 md:size-5"
            />
          </span>
        </div>
      </ComponentVisibility>

      <ComponentVisibility appear={tableData?.length === 0}>
        <div className="flex items-center  md:mt-[53]px xl:mt-[100px]">
          <Empty title="Your Vault is Empty" />
        </div>
      </ComponentVisibility>

      <ComponentVisibility appear={tableData?.length > 0}>
        <div className="w-full  md:overflow-x-auto pb-[32px] lg:pb-[78px]  ">
          <div className=" sm:w-[1200px] lg:w-full">
            <div
              className={cn(
                "  w-full rounded-[8px] overflow-hidden border border-grey-200  ",
                isTableDataSelected.length > 0 ? "mt-[18px]" : "mt-[53px]"
              )}
            >
              <table className="w-full ">
                <thead className="bg-grey-600 text-center border-b border-b-grey-200">
                  {tableHeaders.map((item, index) => (
                    <th
                      key={index}
                      className={cn(
                        "py-[10px] md:py-[16px] px-3 md:px-0",
                        {
                          "hidden sm:table-cell":
                            tableHeaders.length > 3 && !isVisibleOnMobile(item), // Visible on mobile for 3 items
                        },
                        index === 0 && "text-start md:text-center"
                      )}
                    >
                      <Text size="sm" variant="primary" weight="medium">
                        {item}
                      </Text>
                    </th>
                  ))}
                </thead>
                <tbody className="text-center w-full">
                  {tableData?.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr className="border-b border-t border-grey-200">
                        {tableHeaders.map((title, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={cn("py-[16px] px-[10px] md:px-0", {
                              "hidden sm:table-cell":
                                tableHeaders.length > 3 &&
                                !isVisibleOnMobile(title),
                            })}
                          >
                            <Text size="sm" variant="primary" weight="regular">
                              {item[title]}
                            </Text>
                          </td>
                        ))}
                      </tr>
                      <ComponentVisibility appear={showMobileTable === item.id}>
                        <tr className="sm:hidden">
                          <td colSpan={3}>
                            <div className="w-full">{item.MobileTable}</div>
                          </td>
                        </tr>
                      </ComponentVisibility>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <Pagination
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageCount={handlePageCount}
                setPageCount={setPageCount}
              />
            </div>
          </div>
        </div>
      </ComponentVisibility>
    </>
  );
};

export default TableComponent;
