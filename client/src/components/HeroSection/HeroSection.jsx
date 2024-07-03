import React from 'react';
import CatHeroImg from '../../assets/images/cat.png';
import DogHeroImg from '../../assets/images/dog.png';
import { Button } from '../ui/button';

export default function HeroSection() {
    return (
        <section className='h-fit w-full flex items-center pt-16 pb-5 px-5 lg:px-14 lg:h-screen'>
            <div className='flex flex-col lg:flex-row h-full w-full p-7 gap-8 bg-[#FFF5C3] rounded-lg'>
                <div className='lg:w-1/2 flex flex-col justify-start gap-6 p-3 border-2 border-dashed border-black rounded-md'>
                    <h1 className='text-6xl font-bold break-words'>
                        Discover Your Perfect Companion
                    </h1>
                    <span className='text-2xl'>
                        Welcome to <b>PetPals</b>, where love finds its way home. Discover a furry friend who will fill your days with joy. Start your journey to unconditional love today.
                    </span>
                    <Button>Find Your Pet Now... {"->"}</Button>
                </div>
                <div className='lg:w-1/2 flex justify-center items-center'>
                    <img src={DogHeroImg} alt="Meow.." className='h-auto lg:h-full w-full object-cover rounded-md' />
                </div>
            </div>
        </section>
    );
}
