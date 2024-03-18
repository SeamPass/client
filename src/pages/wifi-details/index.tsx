import WifiVault from "@/components/wifi-vault";
import ContainerLayout from "@/shared/layouts/container-layout";

const WifiDetails = () => {
  return (
    <div className="bg-tertiary-100 min-h-screen w-screen flex-col flex m-auto">
      <ContainerLayout>
        <WifiVault />
      </ContainerLayout>
    </div>
  );
};

export default WifiDetails;
