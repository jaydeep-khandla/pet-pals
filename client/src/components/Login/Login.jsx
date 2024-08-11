import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { login } from "@/helperFuncs/auth";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const Login = ({ onToggle }) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [formData, setFormData] = useState({
    userType: "user",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData(prevFormData => ({ ...prevFormData, userType: value }));
  };

  const handleLoginResponse = (response) => {
    switch (response?.status) {
      case 200:
        setAuth(() => ({ accessToken: response?.data?.accessToken }));
        toast.success('Login successful');
        navigate('/');
        break;
      case 201:
        console.log('User is not verified. Otp is sent to your registered Email.');
        toast.info(response.data.message);
        navigate('/verify-otp');
        break;
      case 401:
        console.error('Invalid credentials:', response.data.error);
        toast.error(response.data.error);
        break;
      case 500:
        console.error('Oops..!! Something Broke');
        toast.error(response.data.error);
        break;
      default:
        console.error('Login failed:', response.data?.error || 'Unknown error');
        toast.error(response.data?.error || 'Unknown error');
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
    const user = {
      userType: formData.userType,
      email: formData.email,
      password: formData.password,
    }
    try {
      const response = await login(user);
      handleLoginResponse(response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className=" block font-bold text-sm mb-1 text-gray-700" htmlFor="userType">Login as</label>
          <Select onValueChange={handleSelectChange} value={formData.userType} >
            <SelectTrigger>
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user" >Adopter</SelectItem>
              <SelectItem value="animal_shelter" >Shelter</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
      </form>
      <p className="mt-4 text-neutral-600 ml-1">
        Don't have an account?{" "}
        <a onClick={onToggle} className="cursor-pointer text-blue-500 font-semibold hover:underline text-sm">
          Sign Up
        </a>
      </p>
    </section>
  );
};

export default Login;
