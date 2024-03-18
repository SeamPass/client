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

const ProfilePage = () => {
  const navigate = useNavigate();

  const { emailValidation, requiredFieldValidation } = schemaValidation;

  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
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
      alert(JSON.stringify(values, null, 2));
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
          <div className="flex flex-col gap-y-[24px] mt-[24px] md:mt-0 lg:w-[443px]">
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

            <Button variant="primary">Update</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
