import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/shared/components/button";
// import { createValidationSchema } from "@/helpers/validation-schemas";
import ModalHeader from "@/shared/modal-header";
// import { useFormik } from "formik";
import Sparkles from "@/assets/icons/sparkles.svg?react";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/context/globalContext";
import { useFormik } from "formik";
import useEditPasswordMutation from "@/api/password/edit-password";
import { decryptUserData, encryptUserData } from "@/utils/EncryptDecrypt";
import useGetSinglePasswordQuery from "@/api/password/get-single-password";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import useGeneratePassword from "@/hooks/useGeneratePassword";
import { IGetPasswordProps } from "@/api/password/get-password";
import { usePasswordStrengthMeter } from "@/hooks/usePasswordMeter";

interface EditPasswordProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  data: IGetPasswordProps;
}
const EditPassword: React.FC<EditPasswordProps> = ({ setOpen, data }) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync } = useEditPasswordMutation(data?.id);
  const { data: passwordData } = useGetSinglePasswordQuery(data?.id);
  const { generatePassword, password } = useGeneratePassword();
  const { handleShowPasswordStrength } = usePasswordStrengthMeter();

  useEffect(() => {
    if (!passwordData?.data || !encryptionKey) return;

    const decryptData = async () => {
      const decryptedUsername = await decryptUserData(
        passwordData.data.username.encUsername,
        passwordData.data.username.iv,
        encryptionKey
      );
      const decryptedPassword = await decryptUserData(
        passwordData.data.password.encPassword,
        passwordData.data.password.iv,
        encryptionKey
      );

      formik.setValues({
        websiteName: passwordData.data.websiteName,
        websiteUrl: passwordData.data.url,
        username: decryptedUsername,
        password: decryptedPassword,
      });
    };

    decryptData();
  }, [passwordData, encryptionKey]);

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
      const { ciphertextBase64: encryptedUsername, ivBase64: ivUsername } =
        await encryptUserData(values.username, encryptionKey);
      const { ciphertextBase64: encryptedPassword, ivBase64: ivPassword } =
        await encryptUserData(values.password, encryptionKey);

      const passwordStrength = handleShowPasswordStrength(values.password);

      const response = await mutateAsync({
        websiteName: values.websiteName,
        websiteUrl: values.websiteUrl,
        username: { encUsername: encryptedUsername, iv: ivUsername },
        password: { encPassword: encryptedPassword, iv: ivPassword },
        passwordStrength: passwordStrength.strengthMessage,
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

  useEffect(() => {
    formik.setFieldValue("password", password);
  }, [password]);

  return (
    <DialogContent>
      <DialogDescription>
        <ModalHeader
          subText="Enter the necessary information to create a new password and save"
          title="Edit Password"
        />
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-6 flex flex-col space-y-3">
            <Input
              label="Website/App name"
              name="websiteName"
              value={formik.values.websiteName}
              placeholder="Website/App name"
              onChange={formik.handleChange}
            />
            <Input
              label="Website/URL(optional)"
              placeholder="Enter Username"
              name="websiteUrl"
              value={formik.values.websiteUrl}
              onChange={formik.handleChange}
            />
            <Input
              label="Username/Email address"
              placeholder="Enter Username"
              value={formik.values.username}
              name="username"
              onChange={formik.handleChange}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter Username"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            <Button
              type="button"
              onClick={() => generatePassword()}
              className=" bg-[#9CCDFF66] text-primary-500 flex items-center justify-center gap-[6px]"
            >
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
              Update
            </Button>
          </div>
        </form>
      </DialogDescription>
    </DialogContent>
  );
};

export default EditPassword;
