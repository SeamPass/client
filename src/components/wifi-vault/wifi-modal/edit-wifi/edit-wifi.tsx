import useEditWifiMutation from "@/api/wifi/edit-wifi";
import useGetSingleWifiQuery from "@/api/wifi/get-single-wifi";
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/context/globalContext";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import { Button } from "@/shared/components/button";
import ModalHeader from "@/shared/modal-header";
import { decryptUserData, encryptUserData } from "@/utils/EncryptDecrypt";
import { useFormik } from "formik";
import { FC, useContext, useEffect } from "react";

interface EditWifiProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  id: string;
}

const EditWifi: FC<EditWifiProps> = ({ setOpen, id }) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync } = useEditWifiMutation(id);
  const { data: wifiData } = useGetSingleWifiQuery(id);

  useEffect(() => {
    if (!wifiData?.data || !encryptionKey) return;

    const decryptData = async () => {
      const decryptedWifi = await decryptUserData(
        wifiData.data.wifiPassword.encWifiPassword,
        wifiData.data.wifiPassword.iv,
        encryptionKey
      );

      formik.setValues({
        wifiName: wifiData.data.wifiName,
        wifiPassword: decryptedWifi,
      });
    };

    decryptData();
  }, [wifiData, encryptionKey]);

  const formik = useFormik({
    initialValues: {
      wifiName: "",
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
          setOpen(false);
        },
      });
    },
  });
  console.log(formik.values.wifiName);
  return (
    <>
      <DialogContent>
        <DialogDescription>
          <ModalHeader title="Edit Wifi Details" />

          <form
            onSubmit={formik.handleSubmit}
            className="mt-6 flex flex-col space-y-4"
          >
            <Input
              label="Wifi name"
              placeholder="Enter Secret note"
              name="wifiNAme"
              onChange={formik.handleChange}
              value={formik.values.wifiName}
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
    </>
  );
};

export default EditWifi;
