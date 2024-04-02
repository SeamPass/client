/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import ModalHeader from "@/shared/modal-header";
import { Button } from "../button";
import { FC } from "react";
import snapchat from "@/assets/Snapchat.png";
import ComponentVisibility from "../componentVisibility";

interface DeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  deleteData: any[];
  handleDelete?: (id: any) => Promise<void>;
  data?: any;
}

const DeleteModal: FC<DeleteModalProps> = ({
  open,
  setOpen,
  deleteData,
  data,
  handleDelete,
}) => {
  const passwordIds = deleteData?.map((item) => item.id);

  return (
    <DialogContent>
      <DialogDescription>
        <ModalHeader
          subText="This action cannot be undone"
          title={`Permanently Delete ${
            deleteData ? deleteData?.length : ""
          } Logins`}
        />
        <ComponentVisibility appear={deleteData?.length > 0}>
          <div className="mt-7 space-y-6">
            {deleteData?.map((item) => (
              <div className="flex items-center gap-2">
                <img src={snapchat} alt="snapchat" />
                <div>
                  <p>{item?.websiteName || item?.title || item?.wifiName}</p>
                  <p>{item?.username}</p>
                </div>
              </div>
            ))}
          </div>
        </ComponentVisibility>

        <ComponentVisibility appear={!!data}>
          <div className="mt-7 space-y-6">
            <div className="flex items-center gap-2">
              <img src={snapchat} alt="snapchat" />
              <div>
                <p>{data?.websiteName || data?.title || data?.wifiName}</p>
                <p>{data?.username}</p>
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
              handleDelete && handleDelete(passwordIds || data?.id)
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
