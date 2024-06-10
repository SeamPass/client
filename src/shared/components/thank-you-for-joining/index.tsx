import useResendVerificationLinkMutation from "@/api/verification/resend-verification-link";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import Logo from "@/shared/components/logo";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import AuthLayout from "@/shared/layouts/auth-layout";
interface ThankYouForJoiningProps {
  isResendDisabled: boolean;
  formatCountdown: () => string;
  email: string | null;
  countdown: number | null;
  startCountdown: () => void;
}
const ThankYouForJoining: React.FC<ThankYouForJoiningProps> = ({
  isResendDisabled,
  formatCountdown,
  email,
  countdown,
  startCountdown,
}) => {
  const { mutateAsync } = useResendVerificationLinkMutation();
  function openEmailApp() {
    window.location.href = "mailto:";
  }
  return (
    <AuthLayout>
      <div className="w-full md:w-[538px] text-center">
        <Logo />
        <Header size="xl" variant="primary-100" weight="medium">
          Thank you for joining SeamPass
        </Header>
        <Text size="lg" variant="primary" className=" mt-2 lg:mt-4">
          To ensure the security of your account, We sent a Verification link to
          your email address
        </Text>
        <Text size="lg" variant="primary-50" weight="semibold" className="mt-3">
          {email}
        </Text>

        <Button
          onClick={openEmailApp}
          size="md"
          variant="primary"
          className="mt-4 lg:mt-6 md:!w-[202px] mx-auto"
        >
          Go to email
        </Button>

        <div className="flex justify-center gap-2 text-base mt-4">
          <span className="text-grey-100">Didn't get the link? </span>
          <button
            disabled={isResendDisabled}
            onClick={() => {
              !isResendDisabled && startCountdown();
              email && mutateAsync({ email });
            }}
            className={cn(
              "font-semibold cursor-pointer",
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
    </AuthLayout>
  );
};

export default ThankYouForJoining;
