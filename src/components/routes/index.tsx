import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./protected-routes";
import PublicRoutes from "./public-routes";
import LockedRoute from "./locked-routes";
import UnlockedRoute from "./unlocked-routes";
import loader from "@/assets/loader/loader.svg";

// Lazy-loaded pages
const Security = lazy(() => import("@/pages/Security"));
const CreateAccount = lazy(() => import("@/pages/create-account"));
const ForgotPassword = lazy(() => import("@/pages/forgot-password"));
const Login = lazy(() => import("@/pages/login"));
const EnterOtp = lazy(() => import("@/pages/otp"));
const Password = lazy(() => import("@/pages/password"));
const SetNewPassword = lazy(() => import("@/pages/set-new-password"));
const VerificationSuccessful = lazy(
  () => import("@/pages/verification-successful")
);
const Profile = lazy(() => import("@/pages/profile"));
const VerifyEmail = lazy(() => import("@/pages/verify-email"));
const SecretNotes = lazy(() => import("@/pages/secret-notes"));
const WifiDetails = lazy(() => import("@/pages/wifi-details"));
const Locked = lazy(() => import("@/pages/locked"));

const AllRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen bg-primary-300/80 justify-center items-center">
          <img className="w-[20%] lg:w-[10%] animate-pulse" src={loader} />
        </div>
      }
    >
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          {/* <Route path="/thank-you" element={<ThankYouForJoining />} /> */}
          <Route
            path="/verification-successful"
            element={<VerificationSuccessful />}
          />
          <Route path="/enter-otp" element={<EnterOtp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<UnlockedRoute />}>
            <Route path="/locked" element={<Locked />} />
          </Route>
          <Route element={<LockedRoute />}>
            <Route path="/secret-notes" element={<SecretNotes />} />
            <Route path="/wifi-details" element={<WifiDetails />} />
            <Route path="/security" element={<Security />} />
            <Route path="/profile" element={<Profile />} />

            <Route index path="/password-vault" element={<Password />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
