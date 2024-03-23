/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch } from "@/components/ui/switch";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import Enable2Step from "../modal/enable-2-step";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import useGetUserQuery from "@/api/user/get-user";
import useEnable2StepMutation from "@/api/email-verification/enable2Step";
import useDisable2StepMutation from "@/api/email-verification/disable2Step";

const TwoStepVerification = () => {
  const { mutateAsync: enable2Step } = useEnable2StepMutation();
  const { mutateAsync: disable2Step } = useDisable2StepMutation();
  const { data } = useGetUserQuery();
  const [open, setOpen] = useState(false);

  const userData = data?.user;
  const handleCheckChange = async () => {
    if (!userData?.is2StepEnabled) {
      setOpen(true);
      const response = await enable2Step();
      const { message, success } = response;
      apiMessageHelper({
        message,
        success,
      });
    } else {
      const response = await disable2Step();
      const { message, success } = response;
      apiMessageHelper({
        message,
        success,
      });
    }
  };

  return (
    <>
      <div className="bg-white px-[44px] py-[33px]">
        <div className="flex items-center justify-between">
          <Header size="md" weight="medium" variant="primary-100">
            Enable Two- step verification
          </Header>
          <Switch
            onCheckedChange={handleCheckChange}
            checked={userData?.is2StepEnabled}
          />
        </div>
        <Text size="sm" variant="primary" className=" mt-0.5 md:mt-3">
          Two step email verification is an extra layer of security for your
          account.When logging in or adding a new device, we’ll ask you to enter
          a 6-digit token from your email app. Learn more about 2FA.
          <span className=" text-primary-500 cursor-pointer">
            Learn more about 2FA
          </span>
          .
        </Text>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <Enable2Step setOpen={setOpen} data={data?.user} />
      </Dialog>
    </>
  );
};

export default TwoStepVerification;
