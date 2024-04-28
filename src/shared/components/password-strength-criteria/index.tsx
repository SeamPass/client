import { HelpCircleIcon } from "hugeicons-react";
import Text from "../typography";

import { useSearchParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const PasswordStrengthCriteria = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  return (
    <div className="flex items-center gap-2 my-[22px]">
      <Text weight="medium" size="sm">
        Password strength criteria
      </Text>

      <a data-tooltip-id={`criteria-tooltip`}>
        <HelpCircleIcon className="size-5 text-[#197CE2] cursor-pointer" />
      </a>
      <Tooltip
        id={`criteria-tooltip`}
        place="bottom"
        style={{
          backgroundColor: "#001F3F",
          zIndex: "100",
          width: "90%",
          maxWidth: "230px",
        }}
      >
        {type === "memorable" ? (
          <Text
            weight="regular"
            className="text-white text-[14px] max-w-[230px]"
          >
            <span className=" font-semibold text-sm">Tips:</span> For a strong
            memorable password, use at least 3 words, Make sure the password
            strength indicator shows &apos;Strong&apos; before using your new
            password.
          </Text>
        ) : (
          <Text
            weight="regular"
            className="text-white text-[14px] max-w-[230px]"
          >
            <span className=" font-semibold text-sm">Tips:</span> For a strong
            password, use at least 16 characters, combining letters, numbers,
            and special symbols. Make sure the password strength indicator shows
            &apos;Strong&apos; before using your new password.
          </Text>
        )}
      </Tooltip>
    </div>
  );
};

export default PasswordStrengthCriteria;
