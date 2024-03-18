import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/shared/components/button";
// import { createValidationSchema } from "@/helpers/validation-schemas";
import ModalHeader from "@/shared/modal-header";
// import { useFormik } from "formik";
import Sparkles from "@/assets/icons/sparkles.svg?react";

interface EditPasswordProps {
  open: boolean;
  setOpen: () => void;
}
const EditSecret: React.FC<EditPasswordProps> = ({ setOpen }) => {
  return (
    <>
      <DialogContent>
        <DialogDescription>
          <ModalHeader
            subText="Enter the necessary information to create a new password and save"
            title="Edit Password"
          />

          <div className="mt-6 flex flex-col space-y-3">
            <Input label="Website/App name" placeholder="Enter Username" />
            <Input label="Website/URL(optional)" placeholder="Enter Username" />
            <Input
              label="Username/Email address"
              placeholder="Enter Username"
            />
            <Input label="Password" placeholder="Enter Username" />

            <Button className=" bg-[#9CCDFF66] text-primary-500 flex items-center justify-center gap-[6px]">
              <Sparkles />
              Generate Automatically
            </Button>

            <div className="h-1 w-full bg-primary-500" />
          </div>
          <div className="flex items-center gap-3 mt-[33px]">
            <Button onClick={setOpen} variant="tertiary">
              Cancel
            </Button>
            <Button variant="primary">Update</Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default EditSecret;
