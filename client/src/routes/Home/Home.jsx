import AboutSection from '@/components/AboutSection/AboutSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HeroSection from '@/components/HeroSection/HeroSection';
import WorkSection from '@/components/WorkSection/WorkSection';
import React from 'react';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <Footer />
    </>
  );
}
