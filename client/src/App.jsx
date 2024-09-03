import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "@/routes/Home/Home";
import Auth from "@/routes/Auth/Auth";
import Admin from "@/routes/Admin/Admin";
import PetSearchPage from "@/routes/PetSearchPage/PetSearchPage";
import ProfileRoute from "@/routes/ProfileRoute/ProfileRoute";
import OtpRoute from "@/routes/OtpRoute/OtpRoute";
import PublicProfile from "@/routes/PublicProfile/PublicProfile";
import AdoptionForm from "@/components/AdoptionForm/AdoptionForm";
import Layout from "@/components/Layout/Layout";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import PetProfile from "@/components/PetProfile/PetProfile";
import PersistLogin from "@/components/PersistLogin/PersistLogin";
import ContactPage from "@/components/ContactPage/ContactPage";
import ServicesPage from "./components/Services/Services";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/verify-otp" element={<OtpRoute />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route element={<PersistLogin />}>
            <Route path="/services" element={<ServicesPage />} />

            <Route path="/" element={<Home />} />
            <Route path="/PetList" element={<PetSearchPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/pet/:petId" element={<PetProfile />} />
              <Route path="/user/:id" element={<ProfileRoute />} />
              <Route path="/adoption-form" element={<AdoptionForm />} />
              <Route path="/user-public/:id" element={<PublicProfile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
