import { GlobalContext } from "@/context/globalContext";
import Nav from "@/shared/components/navbar";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const LockedRoute = () => {
  const { encryptionKey } = useContext(GlobalContext);

  return (
    <>
      {encryptionKey ? (
        <>
          <Nav />
          <Outlet />
        </>
      ) : (
        <Navigate to={"/locked"} />
      )}
    </>
  );
};

export default LockedRoute;
