import {
  // DashboardSquare01Icon,
  LockKeyIcon,
  FolderSecurityIcon,
  WebSecurityIcon,
  // Share04Icon,
} from "hugeicons-react";
import { NavItem } from "@/types";
import ContainerLayout from "@/shared/layouts/container-layout";
import BottomNav from "./BottomNav";
import ExtendedNav from "./ExtendedNav";
import MobileNav from "./MobileNav";

const navItems: NavItem = [
  // {
  //   name: "dashboard",
  //   icon: <DashboardSquare01Icon className=" size-5 md:size-6 text-grey-100" />,
  // },
  {
    name: "password vault",
    icon: <LockKeyIcon className="size-5 md:size-6 text-grey-100" />,
    href: "/password-vault",
  },
  {
    name: "stored items",
    icon: <FolderSecurityIcon className="size-5 md:size-6 text-grey-100" />,
    href: "/stored-item",
  },
  {
    name: "security",
    icon: <WebSecurityIcon className="size-5 md:size-6 text-grey-100" />,
    href: "/security",
  },
  // {
  //   name: "password sharing",
  //   icon: <Share04Icon className="size-6 text-grey-100" />,
  // },
];

const Nav = () => {
  return (
    <div className="fixed top-0 z-50 w-full">
      <div className=" bg-lightblue w-full ">
        {/* <div className="w-full h-full bg-[url('/bgImage.png')] bg-center bg-no-repeat"> */}
        <ContainerLayout>
          <ExtendedNav />
          <MobileNav />
        </ContainerLayout>
        {/* </div> */}
      </div>

      <div className="bg-white shadow-[0px_4px_4px_0px_#ECECEC40]">
        <ContainerLayout>
          <BottomNav navItems={navItems} />
        </ContainerLayout>
      </div>
    </div>
  );
};

export default Nav;
