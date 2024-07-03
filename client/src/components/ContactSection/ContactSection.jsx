import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function ContactSection() {
    return (
        <section className='h-fit w-full flex items-center pt-16 pb-5 px-5 lg:px-14 lg:h-screen'>
            <div className='flex flex-col lg:flex-row h-full w-full p-7 gap-8 bg-[#FFF5C3] rounded-lg'>
                <div className='lg:w-1/2 flex justify-center  border-2 border-dashed border-black rounded-md'>
                    {/* <img src={DogHeroImg} alt="Meow.." className='h-auto lg:h-full w-full object-cover rounded-md' /> */}
                    <form className='flex flex-col gap-5 px-8 py-5 w-full'>
                        <h2 className='text-3xl font-bold break-words'>Contact Us</h2>
                        <Input type='text' placeholder='Name' className='' />
                        <Input type='email' placeholder='E-mail' className='' />
                        <Input type='tel' placeholder='Phone No. e.g., without country code' className='' />
                        <Input type='text' placeholder='Subject' className='' />
                        <Textarea placeholder='Message' className='' />
                        <Button>Send a Message</Button>
                    </form>
                </div>
                <div className='lg:w-1/2 flex flex-col justify-start gap-6 p-3 rounded-md'>
                    <h1 className='text-6xl font-bold break-words'>
                        Get in Touch
                    </h1>
                    <span className='text-2xl'>
                        We're here to help you with any questions or concerns. Whether you're looking to adopt, volunteer, or donate, feel free to reach out to us. We're always happy to hear from you.
                    </span>
                    {/* <Button>Find Your Pet Now... {"->"}</Button> */}
                </div>
            </div>
        </section>
    );
}
