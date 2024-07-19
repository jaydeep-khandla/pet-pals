import React, { useState } from "react";
import "@/components/Signup/Signup-style.css";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Signup = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit} className="form__container  ">
          <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
          <section className="mb-4 w-full">
            <div className=" mb-2">
              <label className="font-bold text-gray-700 text-sm" htmlFor="email">
                Full Name
              </label>
              {/* <input
                className="w-full px-3 py-2 border text-sm bg-stone-200 mt-1"
                type="text"
                name="fullName"
                placeholder="Username"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              /> */}
              <Input
                className="mt-1 w-full"
                type="text"
                name="fullName"
                placeholder="Username"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-bold text-gray-700 text-sm" htmlFor="email">
                Email
              </label>
              {/* <input
                className="w-full px-3 py-2 border bg-stone-200 mt-1"
                type="email"
                name="email"
                placeholder="eg. example@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              /> */}
              <Input
                className="mt-1"
                type="email"
                name="email"
                placeholder="eg. example@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-bold text-gray-700 text-sm" htmlFor="email">
                Password
              </label>
              {/* <input
                className="w-full px-3 py-2 border bg-stone-200 mt-1 "
                type="password"
                name="password"
                placeholder="new-password"
                value={formData.password}
                onChange={handleInputChange}
                required
              /> */}
              <Input
                className="mt-1"
                type="password"
                name="password"
                placeholder="new-password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-bold text-gray-700 text-sm " htmlFor="email">
                ConfirmPassword
              </label>
              {/* <input
                className="w-full px-3 py-2 bg-stone-200 mt-1"
                type="password"
                name="confirmPassword"
                placeholder="New-password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              /> */}
              <Input
                className="mt-1 w-full"
                type="password"
                name="confirmPassword"
                placeholder="New-password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </section>
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900">Sign Up</button> */}
          <Button>Sign Up</Button>
        </form>
        <h4 className=" mt-4">
          Already have an account?{" "}
          <a onClick={onToggle} className="cursor-pointer text-blue-500 font-semibold hover:underline">
            Login
          </a>
        </h4>
      </section>
    </>
  );
};
export default Signup;
