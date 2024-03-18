import { Button } from "@/shared/components/button";
import Logo from "@/shared/components/logo";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import AuthLayout from "@/shared/layouts/auth-layout";
import { useNavigate } from "react-router-dom";

const VerificationSuccessful = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="w-full md:w-[538px] text-center">
        <Logo />
        <Header size="xl" variant="primary-100" weight="medium">
          Verification Successful
        </Header>
        <Text size="lg" variant="primary" className=" mt-2 lg:mt-4">
          Log in now to access your account and explore enhanced features and
          personalized settings.
        </Text>

        <Button
          onClick={() => navigate("/login")}
          size="md"
          variant="primary"
          className="mt-4 lg:mt-6 md:!w-[202px]"
        >
          Log into your account
        </Button>
      </div>
    </AuthLayout>
  );
};

export default VerificationSuccessful;
