import useAddWifiMutation from "@/api/wifi/add-wifi";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/context/globalContext";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import {
  createValidationSchema,
  schemaValidation,
} from "@/helpers/validation-schemas";
import { Button } from "@/shared/components/button";
import { encryptUserData } from "@/utils/EncryptDecrypt";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";

const WifiModal = ({
  open,
  onOpenChange,
  password,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<boolean>;
  password: string;
}) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync } = useAddWifiMutation();
  const { requiredFieldValidation } = schemaValidation;

  const formik = useFormik({
    initialValues: {
      wifiName: "",
      wifiPassword: "",
    },

    validationSchema: createValidationSchema({
      wifiName: requiredFieldValidation({
        errorMessage: "Enter your wifi name",
      }),
      wifiPassword: requiredFieldValidation({
        errorMessage: "Enter your wifi password",
      }),
    }),

    onSubmit: async (values) => {
      const {
        ciphertextBase64: encryptedWifiPassword,
        ivBase64: ivWifiPasswordBase64,
      } = await encryptUserData(values.wifiPassword, encryptionKey);

      const response = await mutateAsync({
        wifiName: values.wifiName,
        wifiPassword: {
          encWifiPassword: encryptedWifiPassword,
          iv: ivWifiPasswordBase64,
        },
      });

      const { success, message } = response;

      apiMessageHelper({
        success,
        message: message,
        onSuccessCallback: () => {
          onOpenChange(!open);
        },
      });
    },
  });

  useEffect(() => {
    formik.setFieldValue("wifiPassword", password);
  }, [password]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-y-[12px] mt-[12px] ">
        <div>
          <Input
            label="Wifi name"
            type="text"
            placeholder="Enter Wifi name"
            name="wifiName"
            onChange={formik.handleChange}
            value={formik.values.wifiName}
            formikOnBlur={formik.handleBlur}
            error={
              formik.touched.wifiName && formik.errors.wifiName
                ? formik.errors.wifiName
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
            name="wifiPassword"
            onChange={formik.handleChange}
            value={formik.values.wifiPassword}
            formikOnBlur={formik.handleBlur}
            error={
              formik.touched.wifiPassword && formik.errors.wifiPassword
                ? formik.errors.wifiPassword
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

export default WifiModal;
