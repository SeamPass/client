import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import socialImage from "@/assets/Snapchat.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { checkValidation } from "@/helpers/checkProgressValidation";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import { useFormik } from "formik";
import { ArrowUpRight01Icon, Copy01Icon } from "hugeicons-react";
import { FC, useContext, useEffect, useState } from "react";
import ErrorProgressBar from "@/shared/components/error-progress-bar";
import useGetSinglePasswordQuery from "@/api/password/get-single-password";
import { GlobalContext } from "@/context/globalContext";
import { decryptUserData } from "@/utils/EncryptDecrypt";
import copyToClipboard from "@/utils/copy-to-clipboard";
import { IGetPasswordProps } from "@/api/password/get-password";

interface ViewPasswordProps {
  open: boolean;
  setOpen: () => void;
  data: IGetPasswordProps;
}

const ViewPassword: FC<ViewPasswordProps> = ({ data }) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { requiredFieldValidation } = schemaValidation;
  const [progress, setProgress] = useState(0);
  const passwordMessage = "Enter master password";
  const { data: passwordData } = useGetSinglePasswordQuery(data?.id);

  useEffect(() => {
    if (!passwordData?.data || !encryptionKey) return;

    const decryptData = async () => {
      const decryptedUsername = await decryptUserData(
        passwordData.data.username.encUsername,
        passwordData.data.username.iv,
        encryptionKey
      );
      const decryptedPassword = await decryptUserData(
        passwordData.data.password.encPassword,
        passwordData.data.password.iv,
        encryptionKey
      );

      formik.setValues({
        // websiteName: passwordData.data.websiteName,
        websiteUrl: passwordData.data.url,
        username: decryptedUsername,
        password: decryptedPassword,
      });
    };

    decryptData();
  }, [passwordData, encryptionKey]);

  const formik = useFormik({
    initialValues: {
      websiteUrl: "",
      username: "",
      password: "",
    },
    validationSchema: createValidationSchema({
      password: requiredFieldValidation({
        errorMessage: "",
      }),
    }),
    validate: (values) =>
      checkValidation({ values, setProgress, passwordMessage }),

    onSubmit: async () => {},
  });
  return (
    <>
      <DialogContent>
        <DialogDescription>
          {/* <ModalHeader
            subText="Enter the necessary information to create a new password and save"
            title="Edit Password"
          /> */}
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <img src={socialImage} alt="snaphat" />
                <Text className="text-[20px] md:text-[24px]">Snapchat</Text>
              </div>
              <Text variant="error">Delete</Text>
            </div>

            <div className=" border-[0.5px] border-grey-200 rounded-[8px] p-5 mt-[33px]">
              <Header className="text-primary-300 font-semibold" size="sm">
                Login Details
              </Header>
              <hr className="h-[1px] border-grey-200 mt-3" />

              <div className="mt-6 flex flex-col space-y-4">
                <Input
                  label="Username/Email address"
                  placeholder="Enter Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  disabled
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter Master Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  formikOnBlur={formik.handleBlur}
                  disabled
                  copyIcon={
                    <Copy01Icon
                      onClick={() => copyToClipboard(formik.values.password)}
                      className="text-primary-500 cursor-pointer"
                    />
                  }
                  error={
                    formik.errors.password === passwordMessage
                      ? formik.errors.password
                      : ""
                  }
                  //   errorMessage={
                  //     formik.errors.password !== passwordMessage &&
                  //     formik.errors.password
                  //   }
                />

                {formik.errors.password !== passwordMessage && (
                  <div className="mt-[8px] w-[92%]">
                    <ErrorProgressBar progress={progress} />
                  </div>
                )}
                <p className="mt-1">
                  {progress === 5 ? (
                    <p className="text-[14px]">
                      Awesome, you have a strong password
                    </p>
                  ) : (
                    formik.errors.password !== passwordMessage &&
                    formik.errors.password
                  )}
                </p>

                <Input
                  label="Website/URL(optional)"
                  placeholder="Enter Website URL"
                  inputRightElement={
                    <a href={formik.values.websiteUrl} target="_blank">
                      <ArrowUpRight01Icon className=" size-5 text-[#141B34]" />
                    </a>
                  }
                  value={formik.values.websiteUrl}
                  onChange={formik.handleChange}
                  disabled
                />

                <Textarea
                  className="w-full "
                  label="Type your note here(optional)"
                />
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default ViewPassword;
