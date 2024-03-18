import ProfilePage from "@/components/profile-page";
import ContainerLayout from "@/shared/layouts/container-layout";

const Profile = () => {
  return (
    <div className="bg-tertiary-100 min-h-screen w-screen flex-col flex m-auto">
      <main className="mt-[163px] md:mt-[210px] pb-[33px]">
        <ContainerLayout>
          <ProfilePage />
        </ContainerLayout>
      </main>
    </div>
  );
};

export default Profile;
