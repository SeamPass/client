/* eslint-disable @typescript-eslint/no-explicit-any */
import useVerifyMutation from "@/api/verification/verify-email";
import { Button } from "@/shared/components/button";
import ComponentVisibility from "@/shared/components/componentVisibility";
import { PageLoader } from "@/shared/components/loader";
import Logo from "@/shared/components/logo";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import VerificationExpired from "@/shared/components/verification-expired";
import AuthLayout from "@/shared/layouts/auth-layout";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerificationSuccessful = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, data } = useVerifyMutation();
  const [searchParams] = useSearchParams();

  const newSearchParams = new URLSearchParams(searchParams);
  const token = newSearchParams.get("token");
  useEffect(() => {
    mutateAsync({ token });
  }, [token]);

  return (
    <>
      <ComponentVisibility appear={isPending}>
        <PageLoader />
      </ComponentVisibility>
      <ComponentVisibility appear={!isPending && data?.success}>
        <AuthLayout>
          <div className="w-full md:w-[538px] text-center">
            <Logo />
            <Header size="xl" variant="primary-100" weight="medium">
              Verification Successful
            </Header>
            <Text size="lg" variant="primary" className=" mt-2 lg:mt-4">
              Log in now to access your account and explore enhanced features
              and personalized settings.
            </Text>

            <Button
              onClick={() => navigate("/login")}
              size="md"
              variant="primary"
              className="mt-4 lg:mt-6 md:!w-[202px] mx-auto"
            >
              Log into your account
            </Button>
          </div>
        </AuthLayout>
      </ComponentVisibility>
      <ComponentVisibility appear={!isPending && !data?.success}>
        <VerificationExpired />
      </ComponentVisibility>
    </>
  );
};

export default VerificationSuccessful;
