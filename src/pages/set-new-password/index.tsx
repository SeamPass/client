import { Input } from "@/components/ui/input";
import Headset from "@/assets/icons/headset.svg?react";
import Logo from "@/shared/components/logo";
import Header from "@/shared/components/typography/Header";
import Text from "@/shared/components/typography";
import { Button } from "@/shared/components/button";
import ErrorProgressBar from "@/shared/components/error-progress-bar";
import { useState } from "react";
import { useFormik } from "formik";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";
import AuthLayout from "@/shared/layouts/auth-layout";
import useChangePasswordMutation from "@/api/auth/set-new-password";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

const SetNewPassword = () => {
  const [progress, setProgress] = useState(0);
  const passwordMessage = "Enter new password";
  const { passwordValidation, matchFieldValidation } = schemaValidation;
  // const navigate = useNavigate();
  const { mutateAsync } = useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: createValidationSchema({
      password: passwordValidation({
        errorMessage: "",
      }),
      repeatPassword: matchFieldValidation({
        fieldName: "password",
        errorMessages: {
          requiredError: "Confirm your password",
          fieldMatchError: "Password did not match",
        },
      }),
    }),
    validate: (values) => {
      const errors = { password: "" };
      if (!values.password) {
        errors.password = passwordMessage;
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
        setProgress(1);
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password =
          "Password must contain at least one uppercase letter.";
        setProgress(2);
      } else if (!/[a-z]/.test(values.password)) {
        errors.password =
          "Password must contain at least one lowercase letter.";
        setProgress(3);
      } else if (!/[0-9]/.test(values.password)) {
        errors.password = "Password must contain at least one number.";
        setProgress(4);
      } else if (!/[^A-Za-z0-9]/.test(values.password)) {
        errors.password =
          "Password must contain at least one special character.";
        setProgress(5);
      } else {
        // If none of the above errors are found, keep the password error empty to indicate it's valid
        errors.password = "Awesome ,you have a strong password";
        setProgress(6);
      }

      return errors;
    },

    onSubmit: async (values) => {
      await mutateAsync(values)
        .then((res) => {
          if (!res.success) return toast.error(res.message);
          toast.success(res.message);
          // navigate("/set-new-password");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full md:w-[423px]">
          <Logo />
          <div className=" text-center">
            <Header
              size="xl"
              weight="medium"
              className=" leading-[48px]"
              variant="primary-100"
            >
              Set up a new Master password
            </Header>
            <Text
              size="sm"
              variant="primary"
              className="leading-[28px]  mt-1 lg:mt-2"
            >
              Create a new password to protect your information
            </Text>
          </div>
          <div className="flex flex-col gap-y-[16px] mt-8 ">
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
                <ErrorProgressBar progress={progress} />
              )}
              <p className="mt-1">
                {progress === 6 ? (
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
                  formik.errors.repeatPassword
                    ? formik.errors.repeatPassword
                    : ""
                }
              />
            </div>

            <Button className="mt-6" variant="primary">
              Update password
            </Button>

            <Button
              className="mt-6 flex items-center justify-center gap-2"
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

export default SetNewPassword;
