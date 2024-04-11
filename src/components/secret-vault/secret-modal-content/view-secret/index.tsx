import { IGetSecretProps } from "@/api/secret/get-secret";
import useGetSingleSecretQuery from "@/api/secret/get-single-secret";
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { GlobalContext } from "@/context/globalContext";
import { Button } from "@/shared/components/button";
import Text from "@/shared/components/typography";
import ModalHeader from "@/shared/modal-header";
import { decryptUserData } from "@/utils/EncryptDecrypt";
import { useFormik } from "formik";
import { FC, useContext, useEffect } from "react";

interface ViewSecretProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  data: IGetSecretProps;
}

const ViewSecret: FC<ViewSecretProps> = ({ data }) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { data: secretData } = useGetSingleSecretQuery(data?.id);
  useEffect(() => {
    if (!secretData?.data || !encryptionKey) return;

    const decryptData = async () => {
      const decryptedNote = await decryptUserData(
        secretData.data.note.encNote,
        secretData.data.note.iv,
        encryptionKey
      );

      formik.setValues({
        // websiteName: passwordData.data.websiteName
        note: decryptedNote,
      });
    };

    decryptData();
  }, [secretData, encryptionKey]);

  const formik = useFormik({
    initialValues: {
      note: "",
    },

    onSubmit: async () => {},
  });

  return (
    <>
      <DialogContent className="h-fit">
        <DialogDescription>
          <ModalHeader title="My Diary" />

          <div className="mt-[33px]">
            <Text>{formik.values.note}</Text>
          </div>

          <div className="flex justify-end mt-[73px]">
            <Button className=" !w-fit px-3 text-error-100">Delete</Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default ViewSecret;
