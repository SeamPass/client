import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/shared/components/button";
import { LockKeyIcon } from "hugeicons-react";
import { useFormik } from "formik";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";
import ErrorProgressBar from "@/shared/components/error-progress-bar";
import { useState } from "react";
import { checkValidation } from "@/helpers/checkProgressValidation";
import useChangePasswordMutation from "@/api/user/chnage-password";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import { deriveKey } from "@/utils/keyUtils";
import { generateSalt, hashPassword } from "@/utils/hashPassword";
import { decryptUserData, encryptUserData } from "@/utils/EncryptDecrypt";
import useUpdateEncryptionKeyMutation from "@/api/encryptionKey/update-keys";
import useGetUserQuery from "@/api/user/get-user";
import { handleLogout } from "@/utils/logout";

const ChangePassword = () => {
  const [progress, setProgress] = useState(0);
  const passwordMessage = "Enter new password";
  const { passwordValidation, matchFieldValidation } = schemaValidation;
  const { mutateAsync, isPending } = useChangePasswordMutation();
  const { mutateAsync: updateKeys } = useUpdateEncryptionKeyMutation();
  const { data: userData } = useGetUserQuery();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      repeatPassword: "",
    },

    validationSchema: createValidationSchema({
      password: passwordValidation({
        errorMessage: "",
      }),
      currentPassword: passwordValidation({
        errorMessage: "Enter your current password",
      }),
      repeatPassword: matchFieldValidation({
        fieldName: "password",
        errorMessages: {
          requiredError: "Confirm your password",
          fieldMatchError: "Password did not match",
        },
      }),
    }),
    validate: (values) =>
      checkValidation({ values, setProgress, passwordMessage }),

    onSubmit: async (values) => {
      const hashedPassword = await hashPassword(
        values.currentPassword,
        userData?.user?.clientSalt
      );

      const newEncryptionSalt = generateSalt();
      const newSalt = generateSalt();
      const newHashedPassword = await hashPassword(values.password, newSalt);
      try {
        const response = await mutateAsync({
          oldPassword: hashedPassword,
          newPassword: newHashedPassword,
          confirmNewPassword: newHashedPassword,
          newSalt,
        });

        const { success, message } = response;

        apiMessageHelper({
          success,
          message,
          onSuccessCallback: async () => {
            const sgek = await deriveKey(values.currentPassword, response.salt);

            const newSgek = await deriveKey(values.password, newEncryptionSalt);

            const decryptMasterKey = await decryptUserData(
              response.mk,
              response.iv,
              sgek
            );

            const encryptKey = await encryptUserData(decryptMasterKey, newSgek);

            if (
              encryptKey?.ciphertextBase64 &&
              encryptKey?.ivBase64 &&
              newSalt
            ) {
              await updateKeys({
                mk: encryptKey?.ciphertextBase64,
                iv: encryptKey?.ivBase64,
                newSalt: newEncryptionSalt,
              });
            }
            handleLogout();
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className="bg-white p-5 rounded-[16px]">
      <Alert className="relative bg-error-300 border-[0.5px] border-success-200 p-4">
        <LockKeyIcon className="" />
        <AlertTitle className="text-[#330D0B] text-[20px] font-medium">
          Change Master Password
        </AlertTitle>
        <AlertDescription className="w-full lg:w-[70%] text-[#551612] text-[16px]">
          Proceeding will log you out of your current session, requiring you to
          log back in. Active sessions on other devices
        </AlertDescription>
      </Alert>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-y-[16px] mt-8 "
      >
        <div>
          <Input
            label="Current Password"
            type="password"
            id="currentPassword"
            placeholder="Enter Current Password"
            name="currentPassword"
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
            formikOnBlur={formik.handleBlur}
            error={
              formik.errors.currentPassword ? formik.errors.currentPassword : ""
            }
          />
        </div>
        <div>
          <Input
            label="New Password"
            type="password"
            id="password"
            placeholder="Enter New Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            formikOnBlur={formik.handleBlur}
            error={
              formik.errors.password === passwordMessage
                ? formik.errors.password
                : ""
            }
          />
          {formik.errors.password !== passwordMessage && (
            <div className="w-full mt-[11px]">
              {" "}
              <ErrorProgressBar progress={progress} />
            </div>
          )}
          <p className="mt-1">
            {progress === 5 ? (
              <p className="">Awesome, you have a strong password</p>
            ) : (
              formik.errors.password !== passwordMessage &&
              formik.errors.password
            )}
          </p>
        </div>

        <div>
          <Input
            label="Repeat Password"
            type="password"
            id="password"
            placeholder="Repeat Password"
            name="repeatPassword"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            formikOnBlur={formik.handleBlur}
            error={
              formik.errors.repeatPassword ? formik.errors.repeatPassword : ""
            }
          />
        </div>

        <Button isPending={isPending} className="mt-6" variant="primary">
          Change password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
