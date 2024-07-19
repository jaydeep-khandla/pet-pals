// src/router/Auth.jsx
import React, { useState } from "react";
import Login from "@/components/Login/Login";
import Signup from "@/components/Signup/Signup";
import loginImage from "@/assets/images/cat 3.jpg";
import signupImage from "@/assets/images/dog 1.jpg";
import "@/routes/Auth/auth.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Header />
      <section className="main__section ">
        <div className="main__container md:max-w-3xl ">
          {/* Login Form */}
          <div className={`absolute inset-0 flex transition-transform duration-500 transform ${isLogin ? "translate-x-0" : "-translate-x-full"}`}>
            <div className=" w-full md:w-1/2 image__container h-full">
              <img src={loginImage} alt="Login background" className="object-cover w-full h-full hidden md:block" />
            </div>
            <div className="logsign__container">
              <Login onToggle={toggleForm} />
            </div>
          </div>
          {/* Signup Form */}
          <div className={`absolute inset-0 flex transition-transform duration-500 transform ${isLogin ? "translate-x-full" : "translate-x-0"}`}>
            <div className=" logsign__container">
              <Signup onToggle={toggleForm} />
            </div>
            <div className=" w-full md:w-1/2 image__container  h-full">
              <img src={signupImage} alt="Signup background" className="object-cover w-full  h-full hidden md:block" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Auth;
