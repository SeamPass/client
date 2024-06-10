import useGetSingleWifiQuery from "@/api/wifi/get-single-wifi";
import { IGetWifiProps } from "@/api/wifi/get-wifi";
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/context/globalContext";
import ModalHeader from "@/shared/modal-header";
import { decryptUserData } from "@/utils/EncryptDecrypt";
import { useFormik } from "formik";
import { FC, useContext, useEffect } from "react";

interface ViewWifiProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  data: IGetWifiProps;
}

const ViewWifi: FC<ViewWifiProps> = ({ data }) => {
  const { encryptionKey } = useContext(GlobalContext);
  const { data: wifiData } = useGetSingleWifiQuery(data?.id);

  useEffect(() => {
    if (!wifiData?.data || !encryptionKey) return;

    const decryptData = async () => {
      const decryptedWifiPassword = await decryptUserData(
        wifiData.data.wifiPassword.encWifiPassword,
        wifiData.data.wifiPassword.iv,
        encryptionKey
      );

      formik.setValues({
        // websiteName: passwordData.data.websiteName,
        wifiName: wifiData.data.wifiName,
        wifiPassword: decryptedWifiPassword,
      });
    };

    decryptData();
  }, [wifiData, encryptionKey]);

  const formik = useFormik({
    initialValues: {
      wifiName: "",
      wifiPassword: "",
    },

    onSubmit: async () => {},
  });

  return (
    <>
      <DialogContent className="max-h-[350px]">
        <ModalHeader
          subText="Let SeamPass save your Wifi details for you"
          title="Wifi Details"
        />
        <DialogDescription>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-6 flex flex-col space-y-4"
          >
            <Input
              label="Wifi name"
              placeholder="Enter Secret note"
              name="wifiName"
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
            {/* 
            <Button type="submit" variant="primary">
              Save
            </Button> */}
          </form>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default ViewWifi;
