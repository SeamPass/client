import SecurityPage from "@/components/security";
import ContainerLayout from "@/shared/layouts/container-layout";

const Security = () => {
  return (
    <div className="bg-tertiary-100 min-h-screen w-screen flex-col flex m-auto">
      <main className="mt-[163px] md:mt-[210px] pb-[33px]">
        <ContainerLayout>
          <SecurityPage />
        </ContainerLayout>
      </main>
    </div>
  );
};

export default Security;
