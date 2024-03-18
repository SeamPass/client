import { GlobalContext } from "@/context/globalContext";
import Nav from "@/shared/components/navbar";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { auth } = useContext(GlobalContext);
  console.log(auth);
  return (
    <>
      {!auth.token ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          <Nav />
          <Outlet />
        </>
      )}
    </>
  );
};

export default ProtectedRoutes;
