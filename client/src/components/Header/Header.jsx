import React from 'react';
import Logo from '../../assets/images/logo.svg';
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className='fixed flex justify-between items-center w-full h-fit py-2 px-5 bg-white border-b-2 border-black/20'>
            <img src={Logo} className='h-10' alt="Logo" />
            <Button variant='outline' className='h-full border-2 border-black bg-transparent hover:bg-black hover:text-white' >Login</Button>
        </header>
    );
}
