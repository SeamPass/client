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
const ChangePassword = () => {
  const [progress, setProgress] = useState(0);
  const passwordMessage = "Enter new password";
  const { passwordValidation, matchFieldValidation } = schemaValidation;

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

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
            <ErrorProgressBar progress={progress} />
          )}
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

        <Button className="mt-6" variant="primary">
          Change password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
