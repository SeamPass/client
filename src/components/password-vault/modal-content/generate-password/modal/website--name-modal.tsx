import useAddUserPasswordMutation from "@/api/password/add-password";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/context/globalContext";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import { Button } from "@/shared/components/button";
import { encryptUserData } from "@/utils/EncryptDecrypt";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";

const WebsiteNameModal = ({
  open,
  onOpenChange,
  password,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<boolean>;
  password: string;
}) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync } = useAddUserPasswordMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      websiteName: "",
      websiteUrl: "",
    },
    validate: (values) => {
      const errors: { websiteUrl?: string } = {};
      const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(values?.websiteUrl)) {
        errors.websiteUrl = "Invalid URL";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const {
        ciphertextBase64: encryptedUsername,
        ivBase64: ivUsernameBase64,
      } = await encryptUserData(values.username, encryptionKey);

      const {
        ciphertextBase64: encryptedPassword,
        ivBase64: ivPasswordBase64,
      } = await encryptUserData(values.password, encryptionKey);

      const response = await mutateAsync({
        websiteName: values.websiteName,
        websiteUrl: values.websiteUrl,
        username: encryptedUsername,
        usernameIv: ivUsernameBase64,
        password: encryptedPassword,
        passwordIv: ivPasswordBase64,
      });

      const { success, message } = response;

      apiMessageHelper({
        success,
        message: message,
        onSuccessCallback() {
          onOpenChange(!open);
          formik.resetForm();
        },
      });
    },
  });

  useEffect(() => {
    formik.setFieldValue("password", password);
  }, [password]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-y-[12px] mt-[12px] ">
        <div>
          <Input
            label="Website/App name"
            type="text"
            placeholder="Enter Website/App name"
            name="websiteName"
            onChange={formik.handleChange}
            value={formik.values.websiteName}
            formikOnBlur={formik.handleBlur}
            error={
              formik.touched.websiteName && formik.errors.websiteName
                ? formik.errors.websiteName
                : ""
            }
          />
        </div>

        <div>
          <Input
            label="Username/Email address"
            type="text"
            placeholder="Enter Username/Email address"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            formikOnBlur={formik.handleBlur}
            error={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ""
            }
          />
        </div>

        <div>
          <Input
            label="Website Url"
            type="text"
            placeholder="Enter Website url"
            name="websiteUrl"
            onChange={formik.handleChange}
            value={formik.values.websiteUrl}
            formikOnBlur={formik.handleBlur}
            error={
              formik.touched.websiteUrl && formik.errors.websiteUrl
                ? formik.errors.websiteUrl
                : ""
            }
          />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            value={formik.values.password}
            formikOnBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-[33px]">
        <Button
          type="button"
          onClick={() => onOpenChange(!open)}
          variant="tertiary"
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

export default WebsiteNameModal;
