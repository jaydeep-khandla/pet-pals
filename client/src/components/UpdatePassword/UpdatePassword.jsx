import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '@/helperFuncs/verifyotp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Bg from "@/assets/images/bg.jpg";
import { setNewPassword } from '@/helperFuncs/auth';

export default function OtpRoute() {
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state && location.state.email; // Email from previous route

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Reset errors on change
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validatePasswords = () => {
        let tempErrors = { password: '', confirmPassword: '' };
        if (!formData.password) {
            tempErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.confirmPassword !== formData.password) {
            tempErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every((err) => err === '');
    };

    const onPasswordSubmit = async () => {
        if (!validatePasswords()) {
            return;
        }

        setDisabled(true);

        try {
            const response = await setNewPassword(email, formData.password);
            console.log('Password set successfully:', response);

            if (response.status === 200) {
                navigate('/auth'); // Redirect to success page
            }

        } catch (error) {
            console.error('Error setting new password:', error);
            // Handle error (e.g., show a notification)
        } finally {
            setDisabled(false);
        }
    };

    return (
        <section className='w-full h-screen flex flex-col items-center justify-center' style={{ backgroundImage: `url(${Bg})` }}>
            <div className='h-fit w-[30rem] p-8 flex flex-col items-center justify-center bg-white border-2 border-black rounded-md'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl font-bold'>Set Password</h1>
                    <p className='text-gray-500'>You are setting password for account {email}</p>
                </div>
                <div className='mt-5 flex flex-col w-full'>
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
                </div>
                <div className='m-4 w-full'>
                    <Button className='w-full' disabled={disabled} onClick={onPasswordSubmit}>Set Password</Button>
                </div>
            </div>
        </section>
    );
}
