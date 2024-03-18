import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/shared/components/button";
// import { createValidationSchema } from "@/helpers/validation-schemas";
import ModalHeader from "@/shared/modal-header";
import { useFormik } from "formik";
import Sparkles from "@/assets/icons/sparkles.svg?react";
import useAddUserPasswordMutation from "@/api/password/add-password";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext";
import { encryptUserData } from "@/utils/EncryptDecrypt";
import apiMessageHelper from "@/helpers/apiMessageHelper";

interface AddPasswordProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}
const AddPassword: React.FC<AddPasswordProps> = ({ setOpen }) => {
  // const { requiredFieldValidation } = schemaValidation;
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync } = useAddUserPasswordMutation();

  const formik = useFormik({
    initialValues: {
      websiteName: "",
      websiteUrl: "",
      username: "",
      password: "",
    },
    // validationSchema: createValidationSchema({
    //   email: requiredFieldValidation({
    //     errorMessage: "Enter your email",
    //   }),
    // }),
    onSubmit: async (values) => {
      const {
        ciphertextBase64: encryptedUsername,
        ivBase64: ivUsernameBase64,
      } = await encryptUserData(values.username, encryptionKey);

      const {
        ciphertextBase64: encryptedPassword,
        ivBase64: ivPasswordBase64,
      } = await encryptUserData(values.password, encryptionKey);

      const response = await mutateAsync({
        websiteName: values.websiteName,
        websiteUrl: values.websiteUrl,
        username: encryptedUsername,
        usernameIv: ivUsernameBase64,
        password: encryptedPassword,
        passwordIv: ivPasswordBase64,
      });

      const { success, message } = response;

      apiMessageHelper({
        success,
        message: message,
        onSuccessCallback() {
          setOpen(false);
        },
      });
    },
  });

  return (
    <>
      <DialogContent>
        <DialogDescription>
          <ModalHeader
            subText="Enter the necessary information to create a new password and save"
            title="Add Password"
          />
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-6 flex flex-col space-y-3">
              <Input
                type="text"
                name="websiteName"
                label="Website/App name"
                placeholder="Enter Username"
                onChange={formik.handleChange}
                value={formik.values.websiteName}
              />
              <Input
                type="text"
                name="websiteUrl"
                label="Website/URL(optional)"
                placeholder="Enter Username"
                onChange={formik.handleChange}
                value={formik.values.websiteUrl}
              />
              <Input
                type="text"
                name="username"
                label="Username/Email address"
                placeholder="Enter Username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="Enter Username"
                onChange={formik.handleChange}
                value={formik.values.password}
              />

              <Button className=" bg-[#9CCDFF66] text-primary-500 flex items-center justify-center gap-[6px]">
                <Sparkles />
                Generate Automatically
              </Button>

              <div className="h-1 w-full bg-primary-500" />
            </div>
            <div className="flex items-center gap-3 mt-[33px]">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="tertiary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default AddPassword;
