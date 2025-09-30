import { useState } from 'react';
import { lenis } from '../../lenisInstance';
import useBlockScroll from '../../hooks/useBlockScroll';
import bgHero from '../../assets/backrounds/bgHero.jpg';
import Btn from '../UI/Btn';
import SignUpForm from '../SigningForm/SignUpForm';
import HeaderSignIn from '../layout/Header/HeaderSignIn';

const HeroSection = () => {
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [signInModal, setSignInModal] = useState(false);

  useBlockScroll(isOpenSignUp, lenis);
  useBlockScroll(signInModal, lenis);

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
        <h1 className='text-white text-2xl lg:text-6xl font-bold '>
          Нові знайомства — нові емоції
        </h1>
        <div className='w-65 mt-4'>
          <Btn
            onClick={handleSignUp}
            className={`${isOpenSignUp ? 'opacity-0' : 'opacity-100'}`}
          >
            Створи обліковий запис
          </Btn>

          {isOpenSignUp && (
            <SignUpForm
              handleSignUp={handleSignUp}
              isOpenSignUp={isOpenSignUp}
            />
          )}
          <div className='flex justify-center mt-5 md:hidden'>
            <HeaderSignIn
              setSignInModal={setSignInModal}
              signInModal={signInModal}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
