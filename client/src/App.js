import {  Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Video from "./pages/Video";
import UploadPage from "./pages/UploadPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";



function App() {
  const currentUser = useSelector((state) => state.user.currentUser)

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/video/:id" element={<Video />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/upload" element={<UploadPage />} />
        </Route>


        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        {/* <Route path="video">
          <Route path=":id" element={<Video />} />
        </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
