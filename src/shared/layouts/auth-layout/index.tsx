import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen  items-center justify-center py-[63px] md:py-0 px-[16px] md:px-0 ">
      {children}
    </div>
  );
};

export default AuthLayout;
