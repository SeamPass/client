/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch } from "@/components/ui/switch";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import Enable2Step from "../modal/enable-2-step";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import useGetUserQuery from "@/api/user/get-user";
import useEnable2StepMutation from "@/api/email-verification/enable2Step";
import useDisable2StepMutation from "@/api/email-verification/disable2Step";
import { useCountdown } from "@/hooks/useCountdown";
import { Loader } from "@/shared/components/loader";

const TwoStepVerification = () => {
  const { mutateAsync: enable2Step, isPending } = useEnable2StepMutation();
  const { mutateAsync: disable2Step } = useDisable2StepMutation();
  const [userInfo, setUserInfo] = useState<boolean>(false);
  const { data } = useGetUserQuery();
  const [open, setOpen] = useState(false);
  const { isResendDisabled, formatCountdown, startCountdown, countdown } =
    useCountdown();

  useEffect(() => {
    setUserInfo(data?.user?.is2StepEnabled);
  }, [data]);

  const handleCheckChange = async () => {
    if (!userInfo) {
      const response = await enable2Step();
      const { message, success } = response;
      apiMessageHelper({
        message,
        success,
        onSuccessCallback: () => {
          setOpen(true);
          startCountdown();
        },
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
      <div className="bg-white px-[16px] md:px-[44px] py-[33px]">
        <div className="flex items-center justify-between">
          <Header size="md" weight="medium" variant="primary-100">
            Enable Two- step verification
          </Header>
          {isPending ? (
            <Loader className=" border-primary-500" />
          ) : (
            <Switch onCheckedChange={handleCheckChange} checked={userInfo} />
          )}
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
        <Enable2Step
          formatCountdown={formatCountdown}
          countdown={countdown}
          startCountdown={startCountdown}
          isResendDisabled={isResendDisabled}
          setOpen={setOpen}
          data={data?.user}
        />
      </Dialog>
    </>
  );
};

export default TwoStepVerification;
