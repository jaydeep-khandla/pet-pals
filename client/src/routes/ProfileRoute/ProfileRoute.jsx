import UserProfile from '@/components/UserProfile/UserProfile';
import Bg from "@/assets/images/bg.jpg";
import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function ProfileRoute() {
  return (
    <>
      <Header />
      <section className='flex items-center justify-center' style={{ backgroundImage: `url(${Bg})` }}>
        <UserProfile />
      </section>
      <Footer />
    </>
  );
}
