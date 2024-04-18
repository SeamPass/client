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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center md:hidden justify-between h-[76px]">
        <div className="flex w-[35%] md:w-[15%] ">
          <img className="" src={logo} alt="logo" />
        </div>
        <div className="flex items-center gap-2 md:gap-6">
          {/* <div className="size-[32px] cursor-pointer rounded-full bg-white flex justify-center items-center">
            <NotificationIcon />
          </div> */}
          {/* <div className="w-[1px] h-[24px] md:h-[34.5px] bg-grey-100" /> */}

          {/* avatar */}
          <div className="flex items-center gap-2 md:gap-3">
            <img className="size-8 md:size-10" src={avatar} alt="avatar" />
            <p>Sofiri A</p>

            <DropdownMenu
              open={isOpenDropDown}
              onOpenChange={setIsOpenDropDown}
            >
              <DropdownMenuTrigger asChild>
                <div className="sm:hidden items-center  gap-[6px] ">
                  <ArrowDownIcon className=" size-[24px] cursor-pointer" />

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
              <DropdownMenuContent className=" w-[152px] shadow-none  border-[0.5px]  rounded-[16px] border-grey-200 bg-white mt-4 mr-4 p-2 ">
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="py-2 focus:bg-primary-300 text-[1rem] focus:text-white cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 focus:bg-[#FFF4F3] focus:text-error-100 text-error-100 text-[1rem] cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileNav;
