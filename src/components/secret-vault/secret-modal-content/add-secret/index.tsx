import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/shared/components/button";
// import { createValidationSchema } from "@/helpers/validation-schemas";
import ModalHeader from "@/shared/modal-header";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext";
import useAddSecretMutation from "@/api/secret/add-secret";
import { encryptUserData } from "@/utils/EncryptDecrypt";
import apiMessageHelper from "@/helpers/apiMessageHelper";

interface AddSecretProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}
const AddSecret: React.FC<AddSecretProps> = ({ setOpen }) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync } = useAddSecretMutation();

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
      const { ciphertextBase64: encryptedNote, ivBase64: ivNoteBase64 } =
        await encryptUserData(values.note, encryptionKey);

      const response = await mutateAsync({
        title: values.title,
        note: { encNote: encryptedNote, iv: ivNoteBase64 },
      });

      const { success, message } = response;

      apiMessageHelper({
        success,
        message: message,
        onSuccessCallback: () => {
          setOpen(false);
        },
      });

      console.log({
        title: values.title,
        note: { encNote: encryptedNote, iv: ivNoteBase64 },
      });
    },
  });

  return (
    <>
      <DialogContent>
        <DialogDescription>
          <ModalHeader
            subText="Save and secure important notes here"
            title="Add Secret note"
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

            <Button type="submit" variant="primary">
              Save
            </Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default AddSecret;
