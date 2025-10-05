import { Link } from 'react-router';
import InstructionCard from './InstructionCard';
import instructionContent from '../../data/InstructionCardContent';
import { TiInputChecked } from 'react-icons/ti';

const InstructionContent = () => {
  return (
    <div className='w-full md:max-w-6xl mb-10'>
      <div className='flex flex-col items-center justify-center gap-3 mb-5 md:mb-10 lg:mb-20'>
        <h1 className='text-2xl md:text-5xl text-white font-bold text-center'>
          Як почати знайомства?
        </h1>
        <p className='text-base md:text-lg text-white/80 text-center'>
          Пройди прості кроки - і почни знаходити нових друзів уже сьогодні!
        </p>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
        {instructionContent.map(({ icon, title, description }) => (
          <InstructionCard
            key={title}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </div>
      <div className='mt-5 md:mt-10 lg:mt-20 mb-10'>
        <h3 className='text-xl md:text-3xl font-semibold text-white text-center mb-3'>
          Корисні поради
        </h3>
        <ul className='text-white text-base md:text-lg'>
          <li className='flex items-center gap-1 w-80 md:w-100 mx-auto pl-3 md:pl-10'>
            <TiInputChecked size={30} color='#F73149' />
            Поважай співрозмовника
          </li>
          <li className='flex items-center gap-1 w-80 md:w-100 mx-auto pl-3 md:pl-10'>
            <TiInputChecked size={30} color='#F73149' />
            Не розголошуй особисті дані одразу
          </li>
          <li className='flex items-center gap-1 w-80 md:w-100 mx-auto pl-3 md:pl-10'>
            <TiInputChecked size={30} color='#F73149' />
            Будь собою
          </li>
        </ul>
      </div>
      <Link
        to='/'
        className='text-white bg-[#F73149] md:w-120 h-10 py-2 mx-auto rounded-md transition-colors duration-300  hover:bg-[#D62B40] text-center block  '
      >
        Почати зараз
      </Link>
    </div>
  );
};

export default InstructionContent;
