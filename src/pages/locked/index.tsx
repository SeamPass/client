import useGetUserQuery from "@/api/user/get-user";
import useUnlockAccountMutation from "@/api/user/unlock-account";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/context/globalContext";
import apiMessageHelper from "@/helpers/apiMessageHelper";
// import {
//   createValidationSchema,
//   schemaValidation,
// } from "@/helpers/validation-schemas";
import { Button } from "@/shared/components/button";
import Logo from "@/shared/components/logo";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import AuthLayout from "@/shared/layouts/auth-layout";
import { decryptUserData } from "@/utils/EncryptDecrypt";
import { importKeyFromBase64 } from "@/utils/generateKey";
import { hashPassword } from "@/utils/hashPassword";
import { deriveKey } from "@/utils/keyUtils";
import { useFormik } from "formik";
import { useContext } from "react";

const Locked = () => {
  //   const { passwordValidation } = schemaValidation;
  const { setEncryptionKey } = useContext(GlobalContext);
  const { data: userData } = useGetUserQuery();
  const { mutateAsync, isPending } = useUnlockAccountMutation();

  const formik = useFormik({
    initialValues: {
      masterPassword: "",
    },

    // validationSchema: createValidationSchema({
    //   password: passwordValidation({
    //     errorMessage: "",
    //   }),
    // }),

    onSubmit: async (values) => {
      const hashedPassword = await hashPassword(
        values.masterPassword,
        userData?.user?.clientSalt
      );

      const response = await mutateAsync({
        password: hashedPassword,
        email: userData?.user?.email,
      });

      const { success, message } = response;

      apiMessageHelper({
        success,
        message,
        onSuccessCallback: async () => {
          //decryption taking place here
          const encryptionSalt = response?.salt;
          const mk = response?.mk;
          const ivBase64 = response?.iv;
          const sgek = await deriveKey(values.masterPassword, encryptionSalt);
          console.log(mk, encryptionSalt, ivBase64);
          try {
            const decryptedSGEK = await decryptUserData(mk, ivBase64, sgek);
            const importMk = await importKeyFromBase64(decryptedSGEK);
            setEncryptionKey && setEncryptionKey(importMk);
          } catch (error) {
            console.error("Decryption of SGEK failed:", error);
          }
        },
      });
    },
  });

  return (
    <AuthLayout>
      <div className="w-full md:w-[538px]">
        <Logo />
        <div className=" text-center">
          <Header size="xl" variant="primary-100" weight="medium">
            Your Vault is Locked
          </Header>

          <Text size="lg" variant="primary" className=" mt-2 lg:mt-4">
            Verify your master password to continue
          </Text>
        </div>
        <form onSubmit={formik.handleSubmit} className=" flex flex-col ">
          <div className="mt-8">
            <Input
              label="Master Password"
              type="password"
              id="password"
              placeholder="Master Password"
              name="masterPassword"
              onChange={formik.handleChange}
              value={formik.values.masterPassword}
              formikOnBlur={formik.handleBlur}
              error={
                formik.errors.masterPassword ? formik.errors.masterPassword : ""
              }
            />
          </div>

          <Button
            type="submit"
            size="md"
            isPending={isPending}
            variant="primary"
            className="mt-4 lg:mt-6 "
          >
            Unlock
          </Button>

          <Button
            type="button"
            className="text-error-100 !w-fit !h-fit mx-auto mt-6 font-semibold text-base"
          >
            Logout
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Locked;
