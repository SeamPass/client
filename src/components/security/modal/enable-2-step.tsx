/* eslint-disable @typescript-eslint/no-explicit-any */
import useVerifyCodeMutation from "@/api/email-verification/verify-code";
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import useOtpValidation from "@/hooks/useOtpValidation";
import { Button } from "@/shared/components/button";
import Otp from "@/shared/components/otp-input";
import Text from "@/shared/components/typography";
import { FC } from "react";

interface Enable2StepProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}
const Enable2Step: FC<Enable2StepProps> = ({ setOpen, data }) => {
  const { otp, setOtp, error, setError } = useOtpValidation();
  const { mutateAsync: verify2FA } = useVerifyCodeMutation();

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits long");
      return;
    }

    const response = await verify2FA({ verificationCode: otp });
    const { message, success } = response;
    apiMessageHelper({
      message,
      success,
      onSuccessCallback: () => {
        setOpen(false);
      },
    });
  };
  return (
    <>
      <DialogContent>
        <DialogDescription>
          <div className="w-full ">
            <Text size="lg" variant="primary" className=" mt-2 lg:mt-4">
              A six digit pin has been sent to your email address associated
              with
            </Text>
            <Text
              size="lg"
              variant="primary-50"
              weight="semibold"
              className="mt-3"
            >
              {data?.email}
            </Text>

            <Otp otp={otp} setOtp={setOtp} error={error} />

            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                type="button"
                size="md"
                variant="primary"
                className="mt-6 md:!w-[202px]"
              >
                Verify
              </Button>
            </div>

            <div className="flex justify-center gap-2 text-base mt-4">
              <span className="text-grey-100">Didn't get the link? </span>
              <span className="font-semibold cursor-pointer">Resend</span>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default Enable2Step;
