import { Input } from "@/components/ui/input";
import Headset from "@/assets/icons/headset.svg?react";
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
import useForgotPasswordMutation from "@/api/auth/forgot-password";
import toast from "react-hot-toast";
import { useCountdown } from "@/hooks/useCountdown";

const ForgotPassword = () => {
  const { mutateAsync } = useForgotPasswordMutation();
  const { emailValidation } = schemaValidation;

  const { isResendDisabled, formatCountdown, startCountdown } = useCountdown();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: createValidationSchema({
      email: emailValidation({
        errorMessage: "Enter your email",
      }),
    }),
    onSubmit: async (values) => {
      await mutateAsync(values)
        .then((res) => {
          if (!res.success) {
            return toast.error(res.message);
          }

          toast.success(res.message);
          startCountdown();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit} className="w-full md:w-[423px]">
        <Logo />
        <div className=" text-center">
          <Header size="xl" variant="primary-100" weight="medium">
            Forgot password
          </Header>
          <Text
            size="lg"
            variant="primary"
            weight="regular"
            className=" leading-[28px]"
          >
            Enter your email address to receive a secure link and regain access
            to your account.
          </Text>
        </div>
        <div className="flex flex-col gap-y-[16px] mt-[32px] ">
          <div>
            <Input
              label="Email address"
              type="email"
              id="email"
              placeholder="Enter Email"
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

          <Button className="mt-6" variant="primary">
            Reset Password
          </Button>
          <div className="flex justify-center gap-2 text-base mt-4">
            <span className="text-grey-100">Didn't get the link? </span>
            <button disabled={isResendDisabled} className="font-semibold">
              Resend
            </button>
          </div>

          {isResendDisabled && (
            <div className="text-center my-4">
              <span className="text-success-100 text-base">
                {formatCountdown()}
              </span>
            </div>
          )}

          <Button
            className="mt-6 flex items-center justify-center gap-2"
            variant="tertiary"
          >
            <Headset />
            Contact Support
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
