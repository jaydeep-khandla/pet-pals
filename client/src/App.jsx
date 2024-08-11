import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "@/routes/Home/Home";
import Auth from "@/routes/Auth/Auth";
import ProfileRoute from "@/routes/ProfileRoute/ProfileRoute";
import AdoptionForm from "@/components/AdoptionForm/AdoptionForm";
import Layout from "@/components/Layout/Layout";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import PetSearchPage from "./routes/PetSearchPage/PetSearchPage";
import PetProfile from "./components/PetProfile/PetProfile";
import OtpRoute from "./routes/OtpRoute/OtpRoute";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import ContactPage from "./components/ContactPage/ContactPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/verify-otp" element={<OtpRoute />} />
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Home />} />
            <Route path="/PetList" element={<PetSearchPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/pet/:petId" element={<PetProfile />} />
              <Route path="/user/:id" element={<ProfileRoute />} />
              <Route path="/adoption-form" element={<AdoptionForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
