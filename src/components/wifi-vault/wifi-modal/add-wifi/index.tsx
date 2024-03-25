import useAddWifiMutation from "@/api/wifi/add-wifi";
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/context/globalContext";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import { Button } from "@/shared/components/button";
import ModalHeader from "@/shared/modal-header";
import { encryptUserData } from "@/utils/EncryptDecrypt";
import { useFormik } from "formik";
import { FC, useContext } from "react";

interface AddWifiProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}

const AddWifi: FC<AddWifiProps> = ({ setOpen }) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync } = useAddWifiMutation();

  const formik = useFormik({
    initialValues: {
      wifiNAme: "",
      wifiPassword: "",
    },
    // validationSchema: createValidationSchema({
    //   email: requiredFieldValidation({
    //     errorMessage: "Enter your email",
    //   }),
    // }),
    onSubmit: async (values) => {
      const {
        ciphertextBase64: encryptedWifiPassword,
        ivBase64: ivWifiPasswordBase64,
      } = await encryptUserData(values.wifiPassword, encryptionKey);

      const response = await mutateAsync({
        wifiName: values.wifiNAme,
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
          setOpen(!open);
          formik.resetForm();
        },
      });
    },
  });

  return (
    <DialogOverlay
      onClick={() => formik.resetForm()}
      className=" bg-transparent"
    >
      <DialogContent>
        <DialogDescription>
          <ModalHeader
            subText="Let PassSafe save your Wifi details for you"
            title="Add Wifi Details"
          />

          <form
            onSubmit={formik.handleSubmit}
            className="mt-6 flex flex-col space-y-4"
          >
            <Input
              label="Wifi name"
              placeholder="Enter Secret note"
              name="wifiNAme"
              onChange={formik.handleChange}
              value={formik.values.wifiNAme}
            />
            <Input
              type="password"
              label="Wifi password"
              placeholder="Enter Secret note"
              name="wifiPassword"
              onChange={formik.handleChange}
              value={formik.values.wifiPassword}
            />

            <Button type="submit" variant="primary">
              Save
            </Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </DialogOverlay>
  );
};

export default AddWifi;
