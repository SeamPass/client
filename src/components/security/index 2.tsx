import { useState } from "react";
import ChangePassword from "./change-password";
import Tab from "./tab";
import TwoStepVerification from "./two-step-verification";

const SecurityPage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <div className=" mb-[33px]">
        <Tab setActive={setActive} active={active} />
      </div>

      <div className="w-full lg:w-[70%]">
        {active === 1 && <ChangePassword />}
        {active === 2 && <TwoStepVerification />}
      </div>
    </div>
  );
};

export default SecurityPage;
