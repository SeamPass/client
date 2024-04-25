import { GlobalContext } from "@/context/globalContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { auth } = useContext(GlobalContext);

  return (
    <>
      {auth.token ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};

export default PublicRoutes;
