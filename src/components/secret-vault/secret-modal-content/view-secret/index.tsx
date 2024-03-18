import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import Header from "@/shared/components/typography/Header";
import ModalHeader from "@/shared/modal-header";

const ViewSecret = () => {
  return (
    <>
      <DialogContent>
        <DialogDescription>
          <ModalHeader title="Edit Password" />

          <div className=" border-[0.5px] border-grey-200 rounded-[8px] p-5 mt-[33px]">
            <Header className="text-primary-300 font-semibold" size="sm">
              Login Details
            </Header>
          </div>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default ViewSecret;
