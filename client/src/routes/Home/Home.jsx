import AboutSection from '@/components/AboutSection/AboutSection';
import ContactSection from '@/components/ContactSection/ContactSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HeroSection from '@/components/HeroSection/HeroSection';
import WorkSection from '@/components/WorkSection/WorkSection';
import ChatBot from '@/components/ChatBot/ChatBot';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <Button className=' fixed bottom-6 right-4 font-bold py-6 px-3 rounded-full shadow-lg'><MessageSquare /></Button> */}
      <AboutSection />
      <WorkSection />
      <ContactSection />
      {/* <ChatBot /> */}
      <Popover>
        <PopoverTrigger asChild className='fixed bottom-6 right-4 font-bold py-6 px-3 rounded-full shadow-lg'><Button ><MessageSquare /></Button></PopoverTrigger>
        <PopoverContent className='w-80 h-[40rem] mr-6'><ChatBot /></PopoverContent>
      </Popover>
      <Footer />
    </>
  );
}
