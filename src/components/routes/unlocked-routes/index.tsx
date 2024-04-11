import { GlobalContext } from "@/context/globalContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnlockedRoute = () => {
  const { encryptionKey } = useContext(GlobalContext);

  return (
    <>
      {!encryptionKey ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to={"/password-vault"} />
      )}
    </>
  );
};

export default UnlockedRoute;
