import { NavItem } from "@/types";
import Text from "../typography";
import { Button } from "../button";
import { Menu02Icon, Cancel01Icon, ArrowDown01Icon } from "hugeicons-react";
import { useState } from "react";
import ComponentVisibility from "../componentVisibility";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GeneratePassword from "@/components/password-vault/modal-content/generate-password";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface BottomNavProps {
  navItems: NavItem;
}
const BottomNav: React.FC<BottomNavProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenMobileDropDown, setIsOpenMobileDropDown] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const appendParamToUrl = (key, value) => {
  //   const newSearchParams = new URLSearchParams(searchParams);
  //   newSearchParams.set(key, value);
  //   setSearchParams(newSearchParams);
  //   console.log("first");
  // };
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      <div className="h-[72px] relative  flex justify-between  items-center">
        <div className="h-full items-center gap-6 hidden  md:flex">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={cn(
                  location.pathname.includes(item.href) &&
                    "bg-[#d6eaff]/30 text-primary-500/30 py-[9px] px-4 rounded-[16px]",
                  "flex items-center cursor-pointer "
                )}
              >
                <div>
                  {index === 1 ? (
                    // Wrap the dropdown around the content for index 2
                    <DropdownMenu
                      open={isOpenDropDown}
                      onOpenChange={setIsOpenDropDown}
                    >
                      <DropdownMenuTrigger asChild>
                        <div className="sm:flex items-center hidden  gap-[6px]">
                          <span className="mr-[6px]">{Icon}</span>
                          <Text
                            variant="primary"
                            size="sm"
                            className="capitalize flex items-center gap-[10px]"
                          >
                            {item.name}

                            <div
                              className={cn(
                                " transition-all ease-out duration-200",
                                isOpenDropDown ? "-rotate-180" : "rotate-0"
                              )}
                            >
                              <ArrowDown01Icon />
                            </div>
                          </Text>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className=" w-[257px] shadow-none  border-[0.5px]  rounded-[4px] border-grey-200 bg-white mt-4 p-2 ">
                        <DropdownMenuItem
                          onClick={() => {
                            navigate("/secret-notes");
                          }}
                          className="py-2 focus:bg-primary-300 text-[1rem] focus:text-white cursor-pointer"
                        >
                          Secret notes
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/wifi-details")}
                          className="py-2 focus:bg-primary-300 text-[1rem] focus:text-white cursor-pointer"
                        >
                          Wifi network
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    // Regular content for all other indexes
                    <>
                      <Link className="flex items-center" to={item.href}>
                        <span className="mr-[6px]">{Icon}</span>

                        <Text
                          variant="primary"
                          size="sm"
                          className="flex items-center gap-[6px] capitalize"
                        >
                          {item.name}
                        </Text>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden cursor-pointer size-fit"
        >
          {!isOpen ? (
            <Menu02Icon className=" size-6" />
          ) : (
            <Cancel01Icon className=" size-6" />
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="!w-[171px]" variant="primary">
              Generate Password
            </Button>
          </DialogTrigger>
          <GeneratePassword />
        </Dialog>
      </div>

      <ComponentVisibility appear={isOpen}>
        <div
          style={{ width: "calc(100% -  32px)" }}
          className="bg-white  fixed mx-auto space-y-7 p-4  rounded-[16px] shadow-[0px_49px_90px_0px_#6F6F6F40] sm:hidden "
        >
          {navItems.map((item, index) => (
            <div key={index} className=" ">
              <div
                onClick={() => {
                  index !== 1 && navigate(item.href);
                  index !== 1 && setIsOpen(!isOpen);
                }}
                className=" w-full  flex items-center cursor-pointer "
              >
                <span className="mr-[6px]">{item.icon}</span>
                <Text
                  onClick={() =>
                    index === 1 &&
                    setIsOpenMobileDropDown(!isOpenMobileDropDown)
                  }
                  className="capitalize flex w-full justify-between"
                  variant="primary"
                  size="normal"
                >
                  {item.name}
                  {index === 1 && (
                    <div
                      className={cn(
                        isOpenMobileDropDown ? "-rotate-180" : "rotate-0"
                      )}
                    >
                      {" "}
                      <ArrowDown01Icon />
                    </div>
                  )}
                </Text>
              </div>
              <ComponentVisibility appear={isOpenMobileDropDown}>
                {index === 1 && (
                  <ul className="text-[14px] mt-3 flex flex-col gap-y-3 ml-2">
                    <li
                      onClick={() => {
                        navigate("/secret-notes");
                        setIsOpen(!isOpen);
                        setIsOpenMobileDropDown(!isOpenMobileDropDown);
                      }}
                      className=" cursor-pointer"
                    >
                      Secret notes
                    </li>
                    <li
                      onClick={() => {
                        navigate("/wifi-details");
                        setIsOpen(!isOpen);
                        setIsOpenMobileDropDown(!isOpenMobileDropDown);
                      }}
                      className=" cursor-pointer"
                    >
                      Wifi network
                    </li>
                  </ul>
                )}
              </ComponentVisibility>
            </div>
          ))}
        </div>
      </ComponentVisibility>
    </>
  );
};

export default BottomNav;
