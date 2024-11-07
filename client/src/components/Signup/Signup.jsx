import { useState } from "react";
import "@/components/Signup/Signup-style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { signup } from "@/helperFuncs/auth";

const Signup = ({ onToggle }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userType: "user",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSignUpResponse = (response) => {
    switch (response?.status) {
      case 201:
        console.log('Account created successfully. Otp is sent to your registered Email.');
        toast.info(response.data.message);
        navigate('/verify-otp', { state: { email: response.data.email } });
        break;
      case 401:
        console.error('Invalid credentials:', response.data.error);
        toast.error(response.data.error);
        break;
      case 422:
        console.error('Validation error:', response.data.error);
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

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors if any
      return;
    }

    // Handle form submission logic here
    const user = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      userType: "user",
    }
    try {
      const response = await signup(user);
      handleSignUpResponse(response);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit} className="form__container">
          <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
          <section className="mb-4 w-full">
            <div className="mb-2">
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
            <div className="mb-2">
              <label className="font-bold text-gray-700 text-sm" htmlFor="username">
                Username
                {errors.username && <span className="text-red-500 text-sm ml-2">({errors.username})</span>}
              </label>
              <Input
                className={`mt-1 w-full ${errors.username ? 'border-red-500' : ''}`}
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-2">
              <label className="font-bold text-gray-700 text-sm" htmlFor="email">
                Email
                {errors.email && <span className="text-red-500 text-sm ml-2">({errors.email})</span>}
              </label>
              <Input
                className={`mt-1 w-full ${errors.email ? 'border-red-500' : ''}`}
                type="email"
                name="email"
                placeholder="eg. example@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-2">
              <label className="font-bold text-gray-700 text-sm" htmlFor="password">
                Password
                {errors.password && <span className="text-red-500 text-sm ml-2">({errors.password})</span>}
              </label>
              <Input
                className={`mt-1 w-full ${errors.password ? 'border-red-500' : ''}`}
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-2">
              <label className="font-bold text-gray-700 text-sm" htmlFor="confirmPassword">
                Confirm Password
                {errors.confirmPassword && <span className="text-red-500 text-sm ml-2">({errors.confirmPassword})</span>}
              </label>
              <Input
                className={`mt-1 w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

          </section>
          <Button className="w-full">Sign Up</Button>
        </form>
        <h4 className="mt-4">
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
