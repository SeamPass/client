import PasswordVault from "@/components/password-vault";
import ContainerLayout from "@/shared/layouts/container-layout";

const Password = () => {
  return (
    <div className="bg-tertiary-100 min-h-screen w-screen flex-col flex m-auto">
      <ContainerLayout>
        <PasswordVault />
      </ContainerLayout>

      {/* <Empty>Your vault is empty</Empty> */}
    </div>
  );
};

export default Password;
