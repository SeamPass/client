/* eslint-disable @typescript-eslint/no-explicit-any */
import useEnable2StepMutation from "@/api/email-verification/enable2Step";
import useVerifyCodeMutation from "@/api/email-verification/verify-code";
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import useOtpValidation from "@/hooks/useOtpValidation";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import Otp from "@/shared/components/otp-input";
import Text from "@/shared/components/typography";
import { FC } from "react";

interface Enable2StepProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  formatCountdown: () => string;
  countdown: number | null;
  startCountdown: () => void;
  isResendDisabled: boolean;
}

const Enable2Step: FC<Enable2StepProps> = ({
  setOpen,
  data,
  formatCountdown,
  countdown,
  startCountdown,
  isResendDisabled,
}) => {
  const { otp, setOtp, error, setError } = useOtpValidation();
  const { mutateAsync: verify2FA, isPending } = useVerifyCodeMutation();
  const { mutateAsync: enable2Step } = useEnable2StepMutation();

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

  const handleResendOtp = async () => {
    const response = await enable2Step();
    const { success, message } = response;
    apiMessageHelper({
      message,
      success,
      onSuccessCallback() {
        !isResendDisabled && startCountdown();
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
                isPending={isPending}
                type="button"
                size="md"
                variant="primary"
                className="mt-6 md:!w-[202px]"
              >
                Verify
              </Button>
            </div>

            <div className="flex  justify-center gap-2 text-base mt-4">
              <span className="text-grey-100">Didn't get the link? </span>
              <button
                disabled={isResendDisabled}
                onClick={handleResendOtp}
                className={cn(
                  "font-semibold cursor-pointer ",
                  isResendDisabled && "text-[#CCD2D9]"
                )}
              >
                Resend
              </button>
            </div>
            {isResendDisabled && countdown !== null && countdown > 0 && (
              <div className="text-center my-4">
                <span className="text-success-100 text-base">
                  {formatCountdown()}
                </span>
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </>
  );
};

export default Enable2Step;
