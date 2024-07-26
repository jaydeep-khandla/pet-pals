import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OtpRoute() {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRef = useRef([]);
    const [otpInput, setOtpInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state && location.state.email; //? email from previous route

    useEffect(() => {

        inputRef.current[0]?.focus();

        return () => {

        };
    }, []);

    const handleOtpChange = (index, e) => {

        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value.substring(value.length - 1);

        setOtp(newOtp);

        const combinedOtp = newOtp.join('');

        if (combinedOtp.length === length) {
            setOtpInput(() => combinedOtp);
            onOtpSubmit({email, combinedOtp}); //? API call to submit OTP, did't implement this
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
            };
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
        <section className='w-fit m-auto'>
            <div className='mt-5'>
                {
                    otp.map((value, index) => (
                        <input
                            className=' h-12 w-12 p-4 m-4 rounded-lg text-lg text-center'
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
            <div className='m-4'>
                <button className=' bg-zinc-900 py-2 w-full rounded-md hover:bg-zinc-700' onClick={onOtpSubmit({email, combinedOtp})} >Verify</button>
            </div>
        </section>
    );
}
