import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/shared/components/button";
// import { createValidationSchema } from "@/helpers/validation-schemas";
import ModalHeader from "@/shared/modal-header";
// import { useFormik } from "formik";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import { useFormik } from "formik";
import { decryptUserData, encryptUserData } from "@/utils/EncryptDecrypt";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/context/globalContext";
import useEditSecretMutation from "@/api/secret/edit-secret";
import useGetSingleSecretQuery from "@/api/secret/get-single-secret";
import { Textarea } from "@/components/ui/textarea";
import { IGetSecretProps } from "@/api/secret/get-secret";

interface EditPasswordProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  data: IGetSecretProps;
}
const EditSecret: React.FC<EditPasswordProps> = ({ setOpen, data }) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync, isPending } = useEditSecretMutation(data?.id);
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
        title: secretData.data.title,
        note: decryptedNote,
      });
    };

    decryptData();
  }, [secretData, encryptionKey]);

  const formik = useFormik({
    initialValues: {
      title: "",
      note: "",
    },
    // validationSchema: createValidationSchema({
    //   email: requiredFieldValidation({
    //     errorMessage: "Enter your email",
    //   }),
    // }),
    onSubmit: async (values) => {
      const { ciphertextBase64: encryptedNote, ivBase64: ivNote } =
        await encryptUserData(values.note, encryptionKey);

      const response = await mutateAsync({
        title: values.title,
        note: { encNote: encryptedNote, iv: ivNote },
      });

      const { success, message } = response;

      apiMessageHelper({
        success,
        message: message,
        onSuccessCallback: () => {
          setOpen(false);
        },
      });
    },
  });

  return (
    <DialogContent>
      <DialogDescription>
        <ModalHeader
          subText="Save and secure important notes here"
          title="Edit Secret note"
        />

        <form
          onSubmit={formik.handleSubmit}
          className="mt-6 flex flex-col space-y-4"
        >
          <Input
            label="Title"
            placeholder="Enter Secret note"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <Textarea
            label="Type your note here"
            placeholder="Type your note here"
            name="note"
            onChange={formik.handleChange}
            value={formik.values.note}
          />

          <Button isPending={isPending} type="submit" variant="primary">
            Save
          </Button>
        </form>
      </DialogDescription>
    </DialogContent>
  );
};

export default EditSecret;
