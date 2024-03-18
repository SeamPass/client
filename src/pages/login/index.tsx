import { Input } from "@/components/ui/input";
import Headset from "@/assets/icons/headset.svg?react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/shared/components/logo";
import Header from "@/shared/components/typography/Header";
import Text from "@/shared/components/typography";
import { Button } from "@/shared/components/button";
import { useFormik } from "formik";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";
import AuthLayout from "@/shared/layouts/auth-layout";
import useLoginMutation from "@/api/auth/login";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import { decryptUserData } from "@/utils/EncryptDecrypt";
import { deriveKey, importAESKeyFromHex } from "@/utils/keyUtils";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, setEncryptionKey } = useContext(GlobalContext);
  const { emailValidation, passwordValidation } = schemaValidation;
  const { mutateAsync } = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: createValidationSchema({
      email: emailValidation({
        errorMessage: "Enter your email",
      }),
      password: passwordValidation({
        errorMessage: "Enter your password",
      }),
    }),
    onSubmit: async (values) => {
      const response = await mutateAsync(values);
      // .then((res) => {
      //   if (!res.success) return toast.error(res.message);
      //   toast.success("Login successful");
      //   handleLogin && handleLogin(res.accessToken);
      //   sessionStorage.setItem("accessToken", res.accessToken);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      console.log(response);
      const { success, accessToken, message, expiresIn } = response;
      console.log(accessToken);
      apiMessageHelper({
        success,
        message: message ?? "Login Successful",
        onSuccessCallback: async () => {
          handleLogin && handleLogin(accessToken);
          sessionStorage.setItem("accessToken", accessToken);
          const adjustedExpiresIn = expiresIn - 60;
          sessionStorage.setItem("expiresIn", adjustedExpiresIn.toString());

          //decryption taking place here
          const encryptionSalt = response?.userInfo?.ps;
          const encryptedSGEKBase64 = response?.sgek;
          const ivBase64 = response?.iv;

          const udek = await deriveKey(values.password, encryptionSalt);
          try {
            const decryptedSGEK = await decryptUserData(
              encryptedSGEKBase64,
              ivBase64,
              udek
            );

            const sgek = await importAESKeyFromHex(decryptedSGEK);
            setEncryptionKey && setEncryptionKey(sgek);
          } catch (error) {
            console.error("Decryption of SGEK failed:", error);
            // Handle decryption failure (e.g., incorrect password or corrupted data)
          }
        },
      });
    },
  });

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full md:w-[423px]">
          <Logo />
          <div className=" text-center">
            <Header size="xl" weight="medium" variant="primary-100">
              Log into your account
            </Header>
            <Text size="lg" variant="primary" className="leading-[28px] ">
              Seamlessly access your account and take ful control of your
              experience
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
                label="Master Password"
                type="password"
                id="password"
                placeholder="Enter Master Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                formikOnBlur={formik.handleBlur}
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
              />
              <Link
                to={"/forgot-password"}
                className="text-secondary-200 text-sm font-medium mt-2"
              >
                Forgot Password ?
              </Link>
            </div>

            <Button className="mt-6" variant="primary">
              Log in
            </Button>

            <div className="flex justify-center gap-2 text-base my-6">
              <span className="text-grey-100">Don't have an account? </span>
              <span
                onClick={() => navigate("/create-account")}
                className="font-semibold cursor-pointer"
              >
                Create account
              </span>
            </div>

            <Button
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

export default Login;
