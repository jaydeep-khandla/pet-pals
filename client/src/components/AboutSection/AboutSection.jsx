import React from 'react';
import { Button } from '../ui/button';

export default function AboutSection() {
  return (
    <section className='h-fit w-full flex items-center pt-16 pb-5 px-5 lg:px-14 lg:h-screen'>
      <div className='flex h-full w-full p-7 gap-8 bg-[#FFF5C3] rounded-lg'>
        <div className='flex flex-col justify-start p-3 border-2 border-dashed border-black rounded-md'>
          <h1 className='text-6xl lg:text-8xl font-bold break-words mb-10'>Who We Are?</h1>
          <p className='text-2xl mt-2'>We are a dedicated team of animal lovers committed to connecting homeless pets with caring families. Our mission is to provide a safe and loving environment for every pet until they find their forever home. With a network of shelters and rescue organizations, we work tirelessly to ensure each pet receives the care, love, and attention they deserve</p>
          {/* <Button className='w-fit mt-2'>Meet the Team</Button> */}
          <a href="#" className='mt-4'>Learn More About Our Mission</a>
        </div>
      </div>
    </section>
  );
}
