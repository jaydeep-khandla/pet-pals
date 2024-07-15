import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Login = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    <section>
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className=" block font-bold text-sm text-gray-700" htmlFor="email">
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
          <Input className="mt-1" type="email" name="email" placeholder="eg. example@gmail.com" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 ">
            Password
          </label>
          {/* <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full px-3 py-2 border bg-stone-200 mt-1"
            value={formData.password}
            onChange={handleInputChange}
            required
          /> */}
          <Input
            className="mt-1"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <Button className="w-full mt-5">Log In</Button>
        {/* <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none">
          Log In
        </button> */}
      </form>
      <p className="mt-4 text-neutral-600 ml-1">
        Don't have an account?{" "}
        <button onClick={onToggle} className="text-blue-500 font-semibold hover:underline text-sm">
          SIGN UP
        </button>
      </p>
    </section>
  );
};

export default Login;
