import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "@/routes/Home/Home";
import Auth from "@/routes/Auth/Auth";
import ProfileRoute from "@/routes/ProfileRoute/ProfileRoute";
import AdoptionForm from "@/components/AdoptionForm/AdoptionForm";
import Layout from "@/components/Layout/Layout";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import PetSearchPage from "./routes/PetSearchPage/PetSearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/PetList" element={<PetSearchPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/appform" element={<AdoptionForm />} />
            <Route path="/user-profile" element={<ProfileRoute />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
