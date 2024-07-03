import React from 'react';
import { Button } from '../ui/button';

export default function WorkSection() {
    return (
        <section className='h-fit w-full flex items-center pt-16 pb-5 px-5 lg:px-14 lg:h-screen'>
            <div className='flex h-full w-full p-7 gap-8 bg-[#FFF5C3] rounded-lg'>
                <div className='flex flex-col w-full justify-start p-3 border-2 border-dashed border-black rounded-md'>
                    <h1 className='text-6xl font-bold break-words mb-10 lg:text-8xl'>How Pet Adoption Works</h1>
                    <p className='text-2xl mt-2'>Adopting a pet through our platform is simple and rewarding. Follow these easy steps to find your new companion:
                        <br /><br /><b>1. Browse Pets:</b> Search through our database of adoptable pets based on your preferences.
                        <br /><b>2. Meet and Greet:</b> Schedule a meet-and-greet with potential pets to find the perfect match.
                        <br /><b>3. Home Check:</b> Ensure your home is pet-friendly and ready for your new family member.
                        <br /><b>4. Complete Adoption:</b> Finalize the adoption process and bring your new pet home!
                        <br /><br />Each step is designed to ensure a smooth transition for both you and your new pet</p>
                    <Button className='w-fit mt-2'>Start Your Search</Button>
                    <a href="#" className='mt-4'>Read Adoption Success Stories</a>
                </div>
            </div>
        </section>
    );
}
