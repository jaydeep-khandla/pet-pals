import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home/Home";
import Auth from "./routes/Auth/Auth";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AdoptionForm from "./components/AdoptionForm/AdoptionForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AppForm" element={<AdoptionForm />} />
      </Routes>
    </>
  );
}

export default App;
