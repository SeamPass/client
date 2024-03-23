import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import { ArrowLeft01Icon } from "hugeicons-react";
import image from "@/assets/Ellipse.png";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";
import { Button } from "@/shared/components/button";
import useGetUserQuery from "@/api/user/get-user";
import { useEffect } from "react";
import useUpdateUserMutation from "@/api/user/update-user";
import apiMessageHelper from "@/helpers/apiMessageHelper";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data } = useGetUserQuery();
  const { mutateAsync: updateUser } = useUpdateUserMutation();
  const { emailValidation, requiredFieldValidation } = schemaValidation;

  useEffect(() => {
    formik.setValues({
      email: data?.user?.email,
      nickname: data?.user?.nickname,
    });
  }, [data?.user]);

  const formik = useFormik({
    initialValues: {
      email: data?.user?.email || "",
      nickname: data?.user?.nickname || "",
    },
    validationSchema: createValidationSchema({
      email: emailValidation({
        errorMessage: "",
      }),
      nickname: requiredFieldValidation({
        errorMessage: "",
      }),
    }),
    onSubmit: async (values) => {
      const response = await updateUser({ nickname: values.nickname });
      const { message, success } = response;
      apiMessageHelper({
        message,
        success,
      });
    },
  });

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="flex  items-center cursor-pointer text-grey-100"
      >
        <ArrowLeft01Icon className="size-6" />
        <Text>Go back</Text>
      </div>
      <Header size="lg" className="mt-[33px] hidden md:flex">
        My Profile
      </Header>

      <div className="w-full flex flex-col shrink-0 md:flex-row md:space-x-10 lg:w-[754px] rounded-[16px] bg-white p-3 md:p-4 lg:p-10 mt-[17px]">
        <div className="w-[50%] md:w-[25%] mx-auto md:mx-0 relative">
          <img src={image} alt="profile" />
          <span className="cursor-pointer absolute whitespace-nowrap text-[#F6FAFF] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
            Upload Image
          </span>
        </div>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-y-[24px] mt-[24px] md:mt-0 lg:w-[443px]"
          >
            <div>
              <Input
                label="Email address"
                type="email"
                placeholder="Enter Email"
                name="email"
                disabled
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

            <Button type="submit" variant="primary">
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
