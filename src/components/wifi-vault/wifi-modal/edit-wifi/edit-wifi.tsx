import useEditWifiMutation from "@/api/wifi/edit-wifi";
import useGetSingleWifiQuery from "@/api/wifi/get-single-wifi";
import { IGetWifiProps } from "@/api/wifi/get-wifi";
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
  data: IGetWifiProps;
}

const EditWifi: FC<EditWifiProps> = ({ setOpen, data }) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { mutateAsync, isPending } = useEditWifiMutation(data?.id);
  const { data: wifiData } = useGetSingleWifiQuery(data?.id);

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

  return (
    <>
      <DialogContent className="max-h-[400px]">
        <ModalHeader
          subText="Let SeamPass save your Wifi details for you"
          title="Edit Wifi Details"
        />
        <DialogDescription>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-6 flex flex-col space-y-4"
          >
            <Input
              label="Wifi name"
              placeholder="Enter Wifi Name"
              name="wifiName"
              onChange={formik.handleChange}
              value={formik.values.wifiName}
            />
            <Input
              type="password"
              label="Wifi password"
              placeholder="Enter Wifi Password"
              name="wifiPassword"
              onChange={formik.handleChange}
              value={formik.values.wifiPassword}
            />

            <Button isPending={isPending} type="submit" variant="primary">
              Save
            </Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default EditWifi;
