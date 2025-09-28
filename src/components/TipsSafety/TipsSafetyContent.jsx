import { Link } from 'react-router';
import SafetyPeople from '../../assets/safetyPeople.png';
import TipsCard from './TipsCard';
import tipsContent from '../../data/TipsContent';

const TipsSafetyContent = () => {
  return (
    <div className='mb-10 w-full md:max-w-6xl'>
      <div className='flex flex-col md:flex-row items-center'>
        <div className='w-full'>
          <h2 className='text-white text-2xl md:text-5xl text-center md:text-left font-bold mb-5'>
            Твоя безпека — наш пріоритет
          </h2>
          <p className='text-white/80 text-base text-center md:text-left md:text-lg'>
            Знайомства — це круто. Але завжди варто пам'ятати про свою безпеку.
          </p>
        </div>
        <div className='w-70 h-70 md:w-100 md:h-100'>
          <img
            src={SafetyPeople}
            alt='safetyIcon'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center place-items-center gap-3 md:gap-10 mb-10'>
        {tipsContent.map(({ icon, tip }) => (
          <TipsCard key={tip} icon={icon} tip={tip} />
        ))}
      </div>
      <div className='w-full bg-[#F73149] rounded-lg p-5 text-center h-62 md:h-58'>
        <h3 className='text-white text-xl font-bold mb-3'>
          Що робити у випадку проблеми
        </h3>
        <ol className='text-white text-base list-decimal w-70 mx-auto text-left'>
          <li>Повідомити модераторам</li>
          <li>Подзвонити друзям або поліції</li>
          <li>Зберегти скріни</li>
        </ol>
        <Link
          to='/problem'
          className='text-black  bg-white rounded-2xl p-4 block mt-5 w-70 mx-auto hover:border hover:border-black'
        >
          Повідомити про проблему
        </Link>
      </div>
    </div>
  );
};

export default TipsSafetyContent;
