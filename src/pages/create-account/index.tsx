// import Headset from "@/assets/icons/headset.svg?react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { checkValidation } from "@/helpers/checkProgressValidation";
import AuthLayout from "@/shared/layouts/auth-layout";
import useCreateAccountMutation from "@/api/auth/create-account";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import useEncryptionKeyMutation from "@/api/encryptionKey/store-key";
import { deriveKey } from "@/utils/keyUtils";
import { encryptUserData } from "@/utils/EncryptDecrypt";
import { generateKey } from "@/utils/generateKey";
import { generateSalt, hashPassword } from "@/utils/hashPassword";
import ComponentVisibility from "@/shared/components/componentVisibility";
import ThankYouForJoining from "@/shared/components/thank-you-for-joining";
import { useCountdown } from "@/hooks/useCountdown";

const CreateAccount = () => {
  const { emailValidation, requiredFieldValidation } = schemaValidation;
  const [progress, setProgress] = useState(0);
  const passwordMessage = "Enter master password";
  const { mutateAsync, data } = useCreateAccountMutation();
  const { mutateAsync: encryptionMutateAsync } = useEncryptionKeyMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [storePg, setStorePg] = useState<string | null>(null);
  const [storeEmail, setStoreEmail] = useState<string | null>(null);
  const { isResendDisabled, formatCountdown, startCountdown, countdown } =
    useCountdown();

  const updateSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("pg", "thank-you");
    newSearchParams.set("email", data?.data?.email);

    setSearchParams(newSearchParams);
  };

  const newSearchParams = new URLSearchParams(searchParams);
  const pg = newSearchParams.get("pg");
  const email = newSearchParams.get("email");

  useEffect(() => {
    setStorePg && setStorePg(pg);
    setStoreEmail && setStoreEmail(email);
  }, [pg, email]);

  useEffect(() => {
    if (data?.data?.email) {
      updateSearchParams();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
      hint: "",
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
      hint: requiredFieldValidation({
        errorMessage: "Enter password hint",
      }),
    }),
    validate: (values) =>
      checkValidation({ values, setProgress, passwordMessage }),

    onSubmit: async (values) => {
      const salt = generateSalt();
      const hashedPassword = await hashPassword(values.password, salt);
      const response = await mutateAsync({
        hashedPassword,
        nickname: values.nickname,
        email: values.email,
        clientSalt: salt,
      });
      const { message, success, data } = response;
      apiMessageHelper({
        success,
        message: message,
        onSuccessCallback: async () => {
          const masterKey = await generateKey();
          const sgek = await deriveKey(
            values.password,
            response.data.encryptionSalt
          );

          // Generate an IV for encryption using the generated masterKey from the server
          const { ciphertextBase64, ivBase64 } = await encryptUserData(
            masterKey,
            sgek
          );

          //this send the encrypted master key to the server
          if (ciphertextBase64 && ivBase64 && response) {
            await encryptionMutateAsync({
              userId: data?.id,
              mk: ciphertextBase64,
              iv: ivBase64,
              salt: response?.data?.encryptionSalt,
            });
          }

          startCountdown();
        },
      });
    },
  });
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <ComponentVisibility appear={storePg !== "thank-you"}>
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
                {formik.errors.password &&
                  formik.errors.password !== passwordMessage && (
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
                  label="Password hint"
                  type="hint"
                  placeholder="E.g Mums name,Pets name etc"
                  name="hint"
                  onChange={formik.handleChange}
                  value={formik.values.hint}
                  formikOnBlur={formik.handleBlur}
                  error={
                    formik.touched.hint && formik.errors.hint
                      ? formik.errors.hint
                      : ""
                  }
                  icon={formik.touched.hint && !formik.errors.hint}
                />
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

              {/* <Button
                type="submit"
                className="flex items-center justify-center gap-2"
                variant="tertiary"
              >
                <Headset />
                Contact Support
              </Button> */}
            </div>
          </div>
        </form>
      </ComponentVisibility>
      <ComponentVisibility appear={storePg === "thank-you"}>
        <ThankYouForJoining
          isResendDisabled={isResendDisabled}
          formatCountdown={formatCountdown}
          email={storeEmail}
          countdown={countdown}
          startCountdown={startCountdown}
        />
      </ComponentVisibility>
    </AuthLayout>
  );
};

export default CreateAccount;
