import { useState } from 'react';
import { lenis } from '../../lenisInstance';
import useBlockScroll from '../../hooks/useBlockScroll';
import bgHero from '../../assets/bgHero.svg';
import Btn from '../UI/Btn';
import SignUpForm from '../SigningForm/SignUpForm';

const HeroSection = () => {
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);

  useBlockScroll(isOpenSignUp, lenis);

  const handleSignUp = () => {
    setIsOpenSignUp(!isOpenSignUp);
  };

  return (
    <section
      className='min-h-screen'
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='w-full min-h-screen bg-black/25 flex flex-col justify-center items-center text-black'>
        <h1 className='text-white text-[60px] font-bold'>
          Нові знайомства — нові емоції
        </h1>
        <div className='w-65 mt-4'>
          <Btn onClick={handleSignUp}>Створи обліковий запис</Btn>
          {isOpenSignUp && (
            <SignUpForm
              handleSignUp={handleSignUp}
              isOpenSignUp={isOpenSignUp}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
