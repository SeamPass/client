import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/shared/components/button";
// import { createValidationSchema } from "@/helpers/validation-schemas";
import ModalHeader from "@/shared/modal-header";
import { useFormik } from "formik";
import Sparkles from "@/assets/icons/sparkles.svg?react";
import useAddUserPasswordMutation from "@/api/password/add-password";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@/context/globalContext";
import { encryptUserData } from "@/utils/EncryptDecrypt";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import useGeneratePassword from "@/hooks/useGeneratePassword";
import { usePasswordStrengthMeter } from "@/hooks/usePasswordMeter";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";

interface AddPasswordProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}
const AddPassword: React.FC<AddPasswordProps> = ({ setOpen }) => {
  const { requiredFieldValidation } = schemaValidation;
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync, isPending } = useAddUserPasswordMutation();
  const { generatePassword, password } = useGeneratePassword();
  const { handleShowPasswordStrength } = usePasswordStrengthMeter();
  const formik = useFormik({
    initialValues: {
      websiteName: "",
      websiteUrl: "",
      username: "",
      password: "",
    },
    validationSchema: createValidationSchema({
      websiteName: requiredFieldValidation({
        errorMessage: "Enter website name",
      }),
      username: requiredFieldValidation({
        errorMessage: "Enter username",
      }),
      password: requiredFieldValidation({
        errorMessage: "Enter password",
      }),
    }),
    validate: (values) => {
      const errors: { websiteUrl?: string } = {};
      const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(values?.websiteUrl)) {
        errors.websiteUrl = "Invalid URL";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const {
        ciphertextBase64: encryptedUsername,
        ivBase64: ivUsernameBase64,
      } = await encryptUserData(values.username, encryptionKey);

      const {
        ciphertextBase64: encryptedPassword,
        ivBase64: ivPasswordBase64,
      } = await encryptUserData(values.password, encryptionKey);

      const passwordStrength = handleShowPasswordStrength(values.password);

      const response = await mutateAsync({
        websiteName: values.websiteName,
        websiteUrl: values.websiteUrl,
        username: encryptedUsername,
        usernameIv: ivUsernameBase64,
        password: encryptedPassword,
        passwordIv: ivPasswordBase64,
        passwordStrength: passwordStrength.strengthMessage,
      });

      const { success, message } = response;

      apiMessageHelper({
        success,
        message: message,
        onSuccessCallback() {
          setOpen(!open);
          formik.resetForm();
        },
      });
    },
  });

  useEffect(() => {
    formik.setFieldValue("password", password);
  }, [password]);

  return (
    <React.Fragment>
      <DialogContent className="max-h-[700px]">
        <ModalHeader
          subText="Enter the necessary information to create a new password and save"
          title="Add Password"
        />
        <DialogDescription>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-6 flex flex-col space-y-3">
              <Input
                type="text"
                name="websiteName"
                label="Website/App name"
                placeholder="Enter Username"
                onChange={formik.handleChange}
                value={formik.values.websiteName}
                error={
                  formik.touched.websiteName && formik.errors.websiteName
                    ? formik.errors.websiteName
                    : ""
                }
              />
              <Input
                type="text"
                name="websiteUrl"
                label="Website/URL(optional)"
                placeholder="https://example.com"
                onChange={formik.handleChange}
                value={formik.values.websiteUrl}
                error={
                  formik.touched.websiteUrl && formik.errors.websiteUrl
                    ? formik.errors.websiteUrl
                    : ""
                }
              />

              <Input
                type="text"
                name="username"
                label="Username/Email address"
                placeholder="Username/Email address"
                onChange={formik.handleChange}
                value={formik.values.username}
                error={
                  formik.touched.username && formik.errors.username
                    ? formik.errors.username
                    : ""
                }
              />
              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
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
              <Button isPending={isPending} type="submit" variant="primary">
                Save
              </Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </React.Fragment>
  );
};

export default AddPassword;
