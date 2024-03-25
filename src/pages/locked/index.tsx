import { Input } from "@/components/ui/input";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";
import { Button } from "@/shared/components/button";
import Logo from "@/shared/components/logo";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import AuthLayout from "@/shared/layouts/auth-layout";
import { useFormik } from "formik";

const Locked = () => {
  const { passwordValidation } = schemaValidation;
  const formik = useFormik({
    initialValues: {
      masterPassword: "",
    },

    validationSchema: createValidationSchema({
      password: passwordValidation({
        errorMessage: "",
      }),
    }),

    onSubmit: async () => {
      //   const hashedPassword = await hashPassword(
      //     values.currentPassword,
      //     userData?.user?.clientSalt
      //   );
      //   console.log(userData?.clientSalt);
      //   console.log(values.currentPassword);
      //   console.log(hashedPassword);
      //   const newSalt = generateSalt();
      //   const newHashedPassword = await hashPassword(values.password, newSalt);
      //   console.log(newHashedPassword);
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
        <form className=" flex flex-col ">
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

          <Button size="md" variant="primary" className="mt-4 lg:mt-6 ">
            Unlock
          </Button>

          <Button className="text-error-100 !w-fit !h-fit mx-auto mt-6 font-semibold text-base">
            Logout
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Locked;
