/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import ModalHeader from "@/shared/modal-header";
import { Button } from "../button";
import { FC } from "react";
import snapchat from "@/assets/Snapchat.png";

interface DeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  deleteData: any[];
}

const DeleteModal: FC<DeleteModalProps> = ({ open, setOpen, deleteData }) => {
  return (
    <DialogContent>
      <DialogDescription>
        <ModalHeader
          subText="This action cannot be undone"
          title={`Permanently Delete ${
            deleteData ? deleteData?.length : null
          } Logins`}
        />
        <div className="mt-7 space-y-6">
          {deleteData?.map((item) => (
            <div className="flex items-center gap-2">
              <img src={snapchat} alt="snapchat" />
              <div>
                <p>{item?.websiteName || item?.title}</p>
                <p>{item?.username}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-[33px]">
          <Button onClick={() => setOpen(!open)} variant="tertiary">
            Cancel
          </Button>
          <Button variant="error">Permanently Delete</Button>
        </div>
      </DialogDescription>
    </DialogContent>
  );
};

export default DeleteModal;
