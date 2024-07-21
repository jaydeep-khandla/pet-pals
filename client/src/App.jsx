import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home/Home";
import Auth from "./routes/Auth/Auth";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AdoptionForm from "./components/AdoptionForm/AdoptionForm";
import PetSearchPage from "./routes/PetSearchPage/PetSearchPage";
import { Petlist } from "./components/component/petlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AppForm" element={<AdoptionForm />} />
        <Route path="/PetList" element={<PetSearchPage />} />
      </Routes>
    </>
  );
}

export default App;
