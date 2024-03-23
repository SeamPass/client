import useVerifyOtpMutation from "@/api/email-verification/verify-login-otp";
import { GlobalContext } from "@/context/globalContext";
import apiMessageHelper from "@/helpers/apiMessageHelper";
import useOtpValidation from "@/hooks/useOtpValidation";
import { Button } from "@/shared/components/button";
import Logo from "@/shared/components/logo";
import Otp from "@/shared/components/otp-input";
import Text from "@/shared/components/typography";
import Header from "@/shared/components/typography/Header";
import AuthLayout from "@/shared/layouts/auth-layout";
import { decryptUserData } from "@/utils/EncryptDecrypt";
import { deriveKey, importAESKeyFromHex } from "@/utils/keyUtils";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const EnterOtp = () => {
  const { otp, setOtp, error, setError } = useOtpValidation();
  const navigate = useNavigate();
  const { mutateAsync } = useVerifyOtpMutation();

  const [searchParams] = useSearchParams();
  const { handleLogin, setEncryptionKey, password } = useContext(GlobalContext);

  useEffect(() => {
    if (!password || !email) return navigate("/login");
  }, [password]);

  const newSearchParams = new URLSearchParams(searchParams);
  const email = newSearchParams.get("email");

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits long");
    } else {
      const response = await mutateAsync({
        verificationCode: otp,
        email,
      });
      console.log(response);
      const { message, success, accessToken, expiresIn } = response;
      apiMessageHelper({
        message,
        success,
        onSuccessCallback: async () => {
          handleLogin && handleLogin(accessToken);
          sessionStorage.setItem("accessToken", accessToken);
          const adjustedExpiresIn = expiresIn - 60;
          sessionStorage.setItem("expiresIn", adjustedExpiresIn.toString());

          //decryption taking place here
          const encryptionSalt = response?.userInfo?.ps;
          const encryptedSGEKBase64 = response?.sgek;
          const ivBase64 = response?.iv;

          const udek = await deriveKey(password, encryptionSalt);
          try {
            const decryptedSGEK = await decryptUserData(
              encryptedSGEKBase64,
              ivBase64,
              udek
            );

            const sgek = await importAESKeyFromHex(decryptedSGEK);
            setEncryptionKey && setEncryptionKey(sgek);
          } catch (error) {
            console.error("Decryption of SGEK failed:", error);
          }
        },
      });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full md:w-[538px] text-center">
        <Logo />
        <Header size="xl" variant="primary-100" weight="medium">
          Enter OTP
        </Header>
        <Text size="lg" variant="primary" className=" mt-2 lg:mt-4">
          To ensure the security of your account,We sent a six-digit pin to your
          email address
        </Text>
        <Text size="lg" variant="primary-50" weight="semibold" className="mt-3">
          {email}
        </Text>

        <Otp otp={otp} setOtp={setOtp} error={error} />

        <Button
          onClick={handleSubmit}
          type="button"
          size="md"
          variant="primary"
          className="mt-6 md:!w-[202px]"
        >
          Submit
        </Button>

        <div className="flex justify-center gap-2 text-base mt-4">
          <span className="text-grey-100">Didn't get the link? </span>
          <span className="font-semibold cursor-pointer">Resend</span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EnterOtp;
