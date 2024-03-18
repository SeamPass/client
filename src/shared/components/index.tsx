// type Props = {}

import ContainerLayout from "@/shared/layouts/container-layout";
import ExtendedNav from "./navbar/ExtendedNav";

const TopNav = () => {
  return (
    <nav className=" bg-lightblue">
      <ContainerLayout>
        <ExtendedNav />
      </ContainerLayout>
    </nav>
  );
};

export default TopNav;
