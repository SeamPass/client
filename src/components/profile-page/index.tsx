import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import { ArrowLeft01Icon } from "hugeicons-react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import avatar from "@/assets/Ellipse.png";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";
import { Button } from "@/shared/components/button";
import useGetUserQuery from "@/api/user/get-user";
import { useEffect, useRef } from "react";
import useUpdateUserMutation from "@/api/user/update-user";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import useUploadImageMutation from "@/api/user/upload-image";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data } = useGetUserQuery();
  const { mutateAsync: updateUser, isPending } = useUpdateUserMutation();
  const { mutateAsync: uploadImageAsync } = useUploadImageMutation();
  const { emailValidation, requiredFieldValidation } = schemaValidation;
  const ref = useRef<HTMLInputElement | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  useEffect(() => {
    formik.setValues({
      email: data?.user?.email,
      nickname: data?.user?.nickname,
    });
  }, [data?.user?.email, data?.user?.nickname]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      try {
        const response = await uploadImageAsync({ avatar: selectedFile });
        const { success, message } = response;
        apiMessageHelper({
          message,
          success,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

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

      <div className="w-full flex flex-col  md:flex-row md:space-x-10  lg:w-[754px] rounded-[16px] bg-white p-3 md:p-4 lg:p-10 mt-[17px]">
        <div className="flex  flex-shrink-0 relative w-[200px] h-[200px] mx-auto overflow-hidden rounded-full ">
          <img
            src={!data?.user?.avatar ? avatar : data?.user?.avatar}
            className=" object-cover"
            alt="profile "
          />
          <p
            onClick={() => ref?.current?.click()}
            className="cursor-pointer my-auto font-normal   text-[#F6FAFF] underline absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] "
          >
            Upload Image
            <input
              className="hidden"
              type="file"
              ref={ref}
              accept="image/*"
              onChange={handleImageChange}
            />
          </p>
        </div>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-y-[24px] mt-[24px] md:mt-0 w-full md:w-[443px]"
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

            <Button isPending={isPending} type="submit" variant="primary">
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
