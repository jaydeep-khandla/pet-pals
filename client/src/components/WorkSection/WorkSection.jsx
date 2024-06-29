import React from 'react';

export default function WorkSection() {
    return (
        <section className='h-fit w-fit flex items-center pt-16 pb-5 px-5 lg:px-14 lg:h-screen'>
            <div className='flex h-full w-full p-7 gap-8 bg-[#FFF5C3] rounded-lg'>
                <div className='flex flex-col justify-start p-3 border-2 border-dashed border-black rounded-md'>
                    <h1 className='text-8xl font-bold break-words mb-10'>How Pet Adoption Works</h1>
                    <p className='text-2xl mt-2'>Adopting a pet through our platform is simple and rewarding. Follow these easy steps to find your new companion:

                        Browse Pets: Search through our database of adoptable pets based on your preferences.
                        Meet and Greet: Schedule a meet-and-greet with potential pets to find the perfect match.
                        Home Check: Ensure your home is pet-friendly and ready for your new family member.
                        Complete Adoption: Finalize the adoption process and bring your new pet home!
                        Each step is designed to ensure a smooth transition for both you and your new pet</p>
                    <Button className='w-fit mt-2'>Meet the Team</Button>
                    <a href="#" className='mt-4'>Learn More About Our Mission</a>
                </div>
            </div>
        </section>
    );
}
