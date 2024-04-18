import OtpInput from "react-otp-input";

interface OtpProps {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  error: string;
}
const Otp: React.FC<OtpProps> = ({ otp, setOtp, error }) => {
  return (
    <div className="flex justify-center mt-6">
      <OtpInput
        inputType="tel"
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span className="mr-2 md:mr-4"></span>}
        inputStyle={`!size-[38px] !md:size-[50px] md:!size-[61px] !border !rounded-[8px] !text-center !text-[24px] ${
          error ? "!border !border-error-100 shake " : "!border-grey-200"
        } !outline-none`}
        renderInput={(props) => <input {...props} />}
      />
    </div>
  );
};

export default Otp;
