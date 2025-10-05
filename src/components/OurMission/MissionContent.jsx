import { Link } from 'react-router';
import MissionCard from './MissionCard';
import { missionContent, missionContent2 } from '../../data/MissionCardContent';
import MissionPeoples from '../../assets/images/MissionPeoples.png';
import MissionPeople from '../../assets/images/missionPeople.png';
import HowWeWorkCard from './HowWeWorkCard';

const MissionContent = () => {
  return (
    <div className='w-full max-w-6xl mb-10'>
      <div className='relative flex flex-col md:flex-row items-center mb-0 md:mb-10 lg:mb-20'>
        <div className='w-full'>
          <h1 className='text-2xl md:text-5xl font-bold text-white mb-5 text-center md:text-left'>
            Ми створюємо простір, де студенти знаходять натхнення та підтримку
          </h1>
          <p className='text-base md:text-lg text-white/80 mb-5 text-center md:text-left'>
            Наша місія - об'єднати молодь, допомогти знайти друзів, розвиток, і
            можливості для майбутнього.
          </p>
        </div>
        <div className='w-70 h-70 md:w-140 md:h-140 mt-5 md:mt-0'>
          <img
            src={MissionPeoples}
            alt='Peoples'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center mt-5 md:mt-0'>
        {missionContent.map(({ icon, title, description }) => (
          <MissionCard
            key={title}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </div>
      <h2 className='text-xl md:text-3xl text-center font-medium text-white mt-5 md:mt-10 lg:mt-20'>
        Як ми працюємо
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 md:mt-10 place-items-center'>
        {missionContent2.map(({ icon, title }) => (
          <HowWeWorkCard key={title} icon={icon} title={title} />
        ))}
      </div>
      <p className='text-base md:text-lg text-center text-white/80 mt-5 md:mt-10'>
        Місія - не просто допомогти студентам знайти одне одного. Ми допомагаємо
        знайти себе.
      </p>
      <div className='flex  justify-between pt-10'>
        <div className='flex flex-col gap-10 mt-5 md:mt-10 lg:mt-20'>
          <h3 className='text-xl md:text-2xl text-white text-center'>
            Приєднуйся до нашої спільноти вже сьогодні
          </h3>
          <Link
            to='/'
            className='text-white bg-[#F73149] w-50 h-12 py-3 rounded-md transition-colors duration-300 hover:bg-[#D62B40] text-center block mx-auto md:mx-0'
          >
            Розпочати
          </Link>
        </div>
        <div className='hidden md:block w-60 h-60'>
          <img
            src={MissionPeople}
            alt='People'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default MissionContent;
