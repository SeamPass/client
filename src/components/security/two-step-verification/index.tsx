import { Switch } from "@/components/ui/switch";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";

const TwoStepVerification = () => {
  return (
    <div className="bg-white px-[44px] py-[33px]">
      <div className="flex items-center justify-between">
        <Header size="md" weight="medium" variant="primary-100">
          Enable Two- step verification
        </Header>
        <Switch />
      </div>
      <Text size="sm" variant="primary" className=" mt-0.5 md:mt-3">
        2FA is an extra layer of security for your account.When logging in or
        adding a new device, we’ll ask you to enter a 6-digit token from your
        authenticator app.{" "}
        <span className=" text-primary-500 cursor-pointer">
          Learn more about 2FA
        </span>
        .
      </Text>
    </div>
  );
};

export default TwoStepVerification;
