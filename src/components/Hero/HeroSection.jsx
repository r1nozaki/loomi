import bgHero from '../../assets/bgHero.png';
import Btn from '../UI/Btn';

const HeroSection = () => {
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
        <div className='w-104 mt-22'>
          <Btn>Створити обліковий запис</Btn>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
