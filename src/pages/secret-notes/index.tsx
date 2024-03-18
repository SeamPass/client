import SecretVault from "@/components/secret-vault";
import ContainerLayout from "@/shared/layouts/container-layout";

const SecretNotes = () => {
  return (
    <div className="bg-tertiary-100 min-h-screen w-screen flex-col flex m-auto">
      <ContainerLayout>
        <SecretVault />
      </ContainerLayout>

      {/* <Empty>Your vault is empty</Empty> */}
    </div>
  );
};

export default SecretNotes;
