import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "@/routes/Home/Home";
import Auth from "@/routes/Auth/Auth";
import ProfileRoute from "@/routes/ProfileRoute/ProfileRoute";
import AdoptionForm from "@/components/AdoptionForm/AdoptionForm";
import Layout from "@/components/Layout/Layout";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import PetSearchPage from "./routes/PetSearchPage/PetSearchPage";
import PetProfile from "./components/PetProfile/PetProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/PetList" element={<PetSearchPage />} />
          <Route path="/pet/:petId" element={<PetProfile />} />
          <Route path="/appform" element={<AdoptionForm />} />

          <Route element={<RequireAuth />}>
            <Route path="/user-profile" element={<ProfileRoute />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
