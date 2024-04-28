/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import ModalHeader from "@/shared/modal-header";
import { Button } from "../button";
import { FC } from "react";
import ComponentVisibility from "../componentVisibility";
import { LockKeyIcon } from "hugeicons-react";

interface DeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  deleteData?: any[];
  handleDelete?: (id: any, callback: () => void) => Promise<void>;
  data?: any;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal: FC<DeleteModalProps> = ({
  open,
  setOpen,
  deleteData,
  data,
  handleDelete,
  setIsOpen,
}) => {
  const passwordIds = deleteData?.map((item) => item.id);

  return (
    <DialogContent className="!h-fit">
      <ModalHeader
        subText="This action cannot be undone"
        title={`Permanently Delete ${
          deleteData ? deleteData?.length : ""
        } Logins`}
      />
      <DialogDescription>
        <ComponentVisibility appear={!!deleteData?.length}>
          <div className="mt-7 space-y-6 ">
            {deleteData?.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <LockKeyIcon />
                <div>
                  <p className=" text-primary-300 text-[20px]">
                    {item?.websiteName || item?.title || item?.wifiName}
                  </p>
                  <p className="text-[16px]">{item?.username}</p>
                </div>
              </div>
            ))}
          </div>
        </ComponentVisibility>

        <ComponentVisibility appear={!!data}>
          <div className="mt-7 space-y-6">
            <div className="flex items-center gap-2">
              <div
                className="size-9 rounded-full bg-[#F5F5F5] flex justify-center items-center
"
              >
                <LockKeyIcon className=" text-primary-300 text-[20px]" />
              </div>
              <div>
                <p className=" text-primary-300 text-[20px]">
                  {data?.websiteName || data?.title || data?.wifiName}
                </p>
                <p className="text-[16px]">{data?.username}</p>
              </div>
            </div>
          </div>
        </ComponentVisibility>

        <div className="flex items-center gap-3 mt-[33px]">
          <Button onClick={() => setOpen(!open)} variant="tertiary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleDelete &&
              handleDelete(passwordIds || data?.id || data?._id, () => {
                setOpen(false);
                setIsOpen && setIsOpen(false);
              })
            }
            variant="error"
          >
            Permanently Delete
          </Button>
        </div>
      </DialogDescription>
    </DialogContent>
  );
};

export default DeleteModal;
