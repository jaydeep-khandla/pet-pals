import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Auth from "@/routes/Auth/Auth";
import Admin from "@/routes/Admin/Admin";
import Layout from "@/components/Layout/Layout";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Auth />} />
          <Route path="/admin/*" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
