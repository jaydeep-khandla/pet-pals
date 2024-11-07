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
  const { setAuth } = useAuth();

  const [formData, setFormData] = useState({
    userType: "user",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData(prevFormData => ({ ...prevFormData, userType: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleLoginResponse = (response) => {
    switch (response?.status) {
      case 200:
        setAuth(() => ({ accessToken: response?.data?.accessToken }));
        toast.success('Login successful');
        navigate('/');
        break;
      case 201:
        toast.info('User is not verified. Otp is sent to your registered Email.');
        navigate('/verify-otp');
        break;
      case 401:
        toast.error('Invalid credentials');
        break;
      case 500:
        toast.error('Oops..!! Something Broke');
        break;
      default:
        toast.error('Login failed: Unknown error');
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors if any
      return;
    }

    const user = {
      userType: formData.userType,
      email: formData.email,
      password: formData.password,
    };

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
          <label className="block font-bold text-sm mb-1 text-gray-700" htmlFor="userType">Login as</label>
          <Select onValueChange={handleSelectChange} value={formData.userType}>
            <SelectTrigger>
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Adopter</SelectItem>
              <SelectItem value="animal_shelter">Shelter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700" htmlFor="email">
            Email
            {errors.email && <span className="text-red-500 text-sm ml-2">({errors.email})</span>}
          </label>
          <Input
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
            type="email"
            name="email"
            placeholder="eg. example@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700" htmlFor="password">
            Password
            {errors.password && <span className="text-red-500 text-sm ml-2">({errors.password})</span>}
          </label>
          <Input
            className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col">
          <span className="w-full text-right text-blue-500 font-semibold cursor-pointer hover:underline" onClick={() => { navigate("/forgot-password") }}>
            Forgot Password?
          </span>

          <Button className="w-full mt-1">Log In</Button>
        </div>
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
