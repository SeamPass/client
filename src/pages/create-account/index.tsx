import Headset from "@/assets/icons/headset.svg?react";
import { useNavigate } from "react-router-dom";
import Logo from "@/shared/components/logo";
import Header from "@/shared/components/typography/Header";
import Text from "@/shared/components/typography";
import { Button } from "@/shared/components/button";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
import { useFormik } from "formik";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";
import ErrorProgressBar from "@/shared/components/error-progress-bar";
import { useState } from "react";
import { checkValidation } from "@/helpers/checkProgressValidation";
import AuthLayout from "@/shared/layouts/auth-layout";
import useCreateAccountMutation from "@/api/auth/create-account";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import useEncryptionKeyMutation from "@/api/encryptionKey/store-key";
import { deriveKey } from "@/utils/keyUtils";
import { encryptUserData } from "@/utils/EncryptDecrypt";

const CreateAccount = () => {
  const { emailValidation, requiredFieldValidation } = schemaValidation;
  const [progress, setProgress] = useState(0);
  const passwordMessage = "Enter master password";
  const { mutateAsync } = useCreateAccountMutation();
  const { mutateAsync: encryptionMutateAsync } = useEncryptionKeyMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
    },
    validationSchema: createValidationSchema({
      email: emailValidation({
        errorMessage: "Enter email address",
      }),
      nickname: requiredFieldValidation({
        errorMessage: "Enter your username",
      }),
      password: requiredFieldValidation({
        errorMessage: "",
      }),
    }),
    validate: (values) =>
      checkValidation({ values, setProgress, passwordMessage }),

    onSubmit: async (values) => {
      const response = await mutateAsync(values);
      const { message, success, data } = response;
      console.log(response);
      apiMessageHelper({
        success,
        message: message,
        onSuccessCallback: async () => {
          const udek = await deriveKey(
            values.password,
            response.data.encryptionSalt
          );

          // Generate an IV for encryption
          const { ciphertextBase64, ivBase64 } = await encryptUserData(
            response.data.sgek,
            udek
          );

          if (ciphertextBase64 && ivBase64 && response) {
            await encryptionMutateAsync({
              userId: data?.id,
              sgek: ciphertextBase64,
              iv: ivBase64,
            });
          }
          navigate("/thank-you");
        },
      });
    },
  });
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full md:w-[423px]">
          <Logo />
          <div className=" text-center">
            <Header size="xl" weight="medium" variant="primary-100">
              Create your account
            </Header>
            <Text
              size="lg"
              weight="regular"
              className="leading-[28px] text-[#555555]"
            >
              Take control of your security journey. Sign up now
            </Text>
          </div>
          <div className="flex flex-col gap-y-[16px] mt-[32px] ">
            <div>
              <Input
                label="Email address"
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                formikOnBlur={formik.handleBlur}
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
                icon={formik.touched.email && !formik.errors.email}
              />
            </div>
            <div>
              <Input
                label="Username/Nickname"
                type="text"
                id="Username/Nickname"
                placeholder="Enter Username"
                name="nickname"
                onChange={formik.handleChange}
                value={formik.values.nickname}
                formikOnBlur={formik.handleBlur}
                error={
                  formik.touched.nickname && formik.errors.nickname
                    ? formik.errors.nickname
                    : ""
                }
                icon={formik.touched.nickname && !formik.errors.nickname}
              />
            </div>
            <div>
              <Input
                label="Master Password"
                type="password"
                placeholder="Enter Master Password"
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

            {/* <div className="flex gap-2 text-[1rem]">
              <Checkbox />
              <span className="">
                <span className="text-grey-100">
                  By clicking the checkbox,you agree to
                </span>
                <span className=" text-secondary-200 ml-1">
                  PassSafe Terms and conditions
                </span>
              </span>
            </div> */}

            <Button type="submit" className="mt-6" variant="primary">
              Create account
            </Button>

            <div className="flex justify-center gap-2 text-base my-6">
              <span className="text-grey-100">Already have an account? </span>
              <span
                onClick={() => navigate("/login")}
                className="font-semibold cursor-pointer"
              >
                Log in
              </span>
            </div>

            <Button
              type="submit"
              className="flex items-center justify-center gap-2"
              variant="tertiary"
            >
              <Headset />
              Contact Support
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default CreateAccount;
