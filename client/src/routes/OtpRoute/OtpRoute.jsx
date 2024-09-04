import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '@/helperFuncs/verifyotp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Bg from "@/assets/images/bg.jpg";

export default function OtpRoute() {
    const length = 6;
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRef = useRef([]);
    // const [otpInput, setOtpInput] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state && location.state.email; //? email from previous route

    useEffect(() => {

        inputRef.current[0]?.focus();

        return () => {

        };
    }, []);

    const handleOtpChange = async (index, e) => {

        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value.substring(value.length - 1);

        setOtp(newOtp);

        const combinedOtp = newOtp.join('');

        if (combinedOtp.length === length) {
            // setOtpInput(() => combinedOtp);
            // onOtpSubmit({email, combinedOtp}); //? API call to submit OTP, did't implement this
            try {
                setDisabled(() => true);
                const response = await verifyOtp({ email, otp: combinedOtp });
                console.log('verification successful:', response);
                navigate('/auth');
            } catch (error) {
                console.error('Otp failed:', error);
            }
        }

        // if(!value) {
        //   inputRef.current[index-1]?.focus();
        // }

        if (value && index < length - 1 && inputRef.current[index + 1]) {
            // console.log(otp);
            if (newOtp[index + 1]) {
                inputRef.current[newOtp.indexOf('')]?.focus()
            }
            else {
                inputRef.current[index + 1]?.focus()
            }
            // console.log(newOtp[index + 1]);
        }

    };

    // console.log(otp);

    const handleOtpClick = (index) => {
        if (inputRef.current[index]) {
            inputRef.current[index].setSelectionRange(1, 1);
        }

        if (index > 0 && !otp[index - 1]) {
            inputRef.current[otp.indexOf('')]?.focus();
        }
    }

    const handleOtpKeyDown = (index, e) => {
        if (e.key == 'Backspace' && !otp[index] && index > 0 && inputRef.current[index - 1]) {
            console.log(otp[index]);
            inputRef.current[index - 1]?.focus();
        }
    }

    return (
        <section className='w-full h-screen flex flex-col items-center justify-center' style={{ backgroundImage: `url(${Bg})` }}>
            <div className='h-fit w-fit p-16 flex flex-col items-center justify-center bg-white border-2 border-black rounded-md'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl font-bold'>Enter OTP</h1>
                    <p className='text-gray-500'>OTP sent to {email}</p>
                </div>
                <div className='mt-5 flex'>
                    {
                        otp.map((value, index) => (
                            <Input
                                className=' h-12 w-12 p-4 m-2 rounded-lg text-lg text-black text-center border-2 border-black'
                                key={index}
                                ref={(input) => (inputRef.current[index] = input)}
                                type="text"
                                value={value}
                                onChange={(e) => handleOtpChange(index, e)}
                                onClick={() => handleOtpClick(index)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            />
                        ))
                    }
                </div>
                <div className='m-4 w-full'>
                    <Button className='w-full' disabled={disabled}>Verify</Button>
                </div>
            </div>
        </section>
    );
}
// onClick={onOtpSubmit({email, combinedOtp})}