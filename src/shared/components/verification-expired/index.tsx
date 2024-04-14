import { Button } from "@/shared/components/button";
import Logo from "@/shared/components/logo";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import AuthLayout from "@/shared/layouts/auth-layout";
import Expired from "@/assets/expired.svg?react";
import useResendVerificationLinkMutation from "@/api/verification/resend-verification-link";
import { useSearchParams } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

const VerificationExpired = () => {
  const { mutateAsync } = useResendVerificationLinkMutation();
  const { isResendDisabled, startCountdown, formatCountdown, countdown } =
    useCountdown();
  const [searchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const email = newSearchParams.get("email");

  return (
    <>
      <AuthLayout>
        <div className="w-full md:w-[538px] text-center">
          <Logo />
          <div className="flex justify-center mb-4 lg:mb-6 mt-[51px] lg:mt-[102px]">
            <Expired />
          </div>
          <Header size="xl" variant="primary-100" weight="medium">
            Verification Link Expired
          </Header>
          <Text size="lg" variant="primary" className=" mt-2 lg:mt-4">
            Sorry, your verification was unsuccessful. Please try again
          </Text>

          <Button
            onClick={() => {
              email && mutateAsync({ email });
              !isResendDisabled && startCountdown();
            }}
            disabled={isResendDisabled}
            size="md"
            variant="primary"
            className={cn(
              "mt-4 lg:mt-6 md:!w-[202px]",
              isResendDisabled &&
                "bg-[#CCD2D9] active:bg-[#CCD2D9]  hover:bg-[#CCD2D9]"
            )}
          >
            Resend Link
          </Button>

          {isResendDisabled && countdown !== null && countdown > 0 && (
            <div className="text-center my-4">
              <span className="text-success-100 text-base">
                {formatCountdown()}
              </span>
            </div>
          )}
        </div>
      </AuthLayout>
    </>
  );
};

export default VerificationExpired;
