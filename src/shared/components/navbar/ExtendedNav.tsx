// type Props = {}
import logo from "@/assets/logo.png";
import avatar from "@/assets/avatar.png";
// import NotificationIcon from "@/assets/icons/notification.svg?react";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg?react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetUserQuery from "@/api/user/get-user";
import useLogoutMutation from "@/api/auth/logout";
import apiMessageHelper from "@/helpers/apiMessageHelper";

const ExtendedNav = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const { data: userData } = useGetUserQuery();
  const { mutateAsync } = useLogoutMutation();

  const handleLogout = async () => {
    const response = await mutateAsync();
    const { success, message } = response;
    apiMessageHelper({
      success,
      message,
      onSuccessCallback: () => {
        sessionStorage.clear();
        window.location.reload();
      },
    });
  };

  const navigate = useNavigate();
  return (
    <div className="sm:flex   items-center hidden justify-between h-[114px]">
      <div className="flex w-[15%] ">
        <img className="" src={logo} alt="logo" />
      </div>
      <div className="flex items-center gap-6">
        {/* <div className="w-[44px] h-[44px] cursor-pointer rounded-full bg-white flex justify-center items-center">
          <NotificationIcon />
        </div> */}
        {/* <div className="w-[1px] h-[34.5px] bg-grey-100" /> */}

        {/* avatar */}
        <div className="flex items-center gap-3">
          <img
            src={userData?.user?.avatar ? userData?.user?.avatar : avatar}
            alt="avatar"
            className="size-[50px] rounded-full"
          />

          <p className=" capitalize text-[16px] lg:text-[18px] text-primary-100 ">
            {userData?.user?.nickname}
          </p>

          <DropdownMenu open={isOpenDropDown} onOpenChange={setIsOpenDropDown}>
            <DropdownMenuTrigger asChild>
              <div className=" items-center   gap-[6px] ">
                <ArrowDownIcon className=" size-[24px] cursor-pointer text-primary-600" />

                <div
                  className={cn(
                    " transition-all ease-out duration-200",
                    isOpenDropDown ? "-rotate-180" : "rotate-0"
                  )}
                >
                  {/* <ArrowDown01Icon /> */}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-[247px] hidden sm:block shadow-[0px_40px_80px_0px_#B9B9B940]  border-[0.5px]  rounded-[16px] border-grey-200 bg-white mt-4 mr-4 p-2 ">
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="py-2 focus:bg-primary-300 text-[1rem] focus:text-white cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="py-2 focus:bg-[#FFF4F3] focus:text-error-100 text-error-100 text-[1rem] cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ExtendedNav;
