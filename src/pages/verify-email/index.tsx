import { Button } from "@/shared/components/button";
import Logo from "@/shared/components/logo";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import AuthLayout from "@/shared/layouts/auth-layout";

const VerifyEmail = () => {
  return (
    <AuthLayout>
      <div className="w-full md:w-[538px] text-center">
        <Logo />
        <Header size="xl" variant="primary-100" weight="medium">
          Please check your email address
        </Header>
        <Text size="lg" variant="primary" className=" mt-2 lg:mt-4">
          We sent a password reset link to your email address
        </Text>
        <Text size="lg" variant="primary-50" weight="semibold" className="mt-3">
          Sofiriamgbara@gmail.com
        </Text>

        <Button
          onClick={() => window.open("mailto:")}
          size="md"
          variant="primary"
          className="mt-4 lg:mt-6 md:!w-[202px]"
        >
          Go to email
        </Button>
        <div className="flex justify-center gap-2 text-base mt-4">
          <span className="text-grey-100">Didn't get the link? </span>
          <span className="font-semibold cursor-pointer">Resend</span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
