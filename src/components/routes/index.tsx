import Security from "@/pages/Security";
import CreateAccount from "@/pages/create-account";
import ForgotPassword from "@/pages/forgot-password";
import Login from "@/pages/login";
import EnterOtp from "@/pages/otp";
import Password from "@/pages/password";
import SetNewPassword from "@/pages/set-new-password";
import ThankYouForJoining from "@/pages/thank-you-for-joining";
import VerificationSuccessful from "@/pages/verification-successful";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./protected-routes";
import PublicRoutes from "./public-routes";
import Profile from "@/pages/profile";
import VerifyEmail from "@/pages/verify-email";
import SecretNotes from "@/pages/secret-notes";
import WifiDetails from "@/pages/wifi-details";
import Locked from "@/pages/locked";
import LockedRoute from "./locked-routes";
import UnlockedRoute from "./unlocked-routes";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/thank-you" element={<ThankYouForJoining />} />
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

            <Route path="/password-vault" element={<Password />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
