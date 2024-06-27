import React from 'react';
import CatHeroImg from '../../assets/images/cat.png';
import DogHeroImg from '../../assets/images/dog.png';

export default function HeroSection() {
  return (
    <div className='h-screen w-screen flex justify-center '>
      <img src={DogHeroImg} alt="Meow.." className='h-full' />
    </div>
  );
}
