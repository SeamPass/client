import { GlobalContext } from "@/context/globalContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { auth } = useContext(GlobalContext);

  return (
    <>
      {!auth.token ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};

export default ProtectedRoutes;
