import { Link } from 'react-router';
import supportContent from '../../data/SupportCardContent';
import supportPeople from '../../assets/supportPeople.png';
import SupportCard from './SupportCard';
import SupportForm from './SupportForm';

const SupportContent = () => {
  return (
    <div className='w-full md:max-w-6xl mb-10'>
      <div className='flex flex-col md:flex-row items-center mb-0 md:mb-10 lg:mb-20'>
        <div className='w-full'>
          <h2 className='text-white text-2xl md:text-5xl text-center md:text-left font-bold mb-5'>
            Підтримка студентів 24/7
          </h2>
          <p className='text-white/80 text-base text-center md:text-left md:text-lg mb-5'>
            Ми тут, щоб допомогти вирішити будь-яке питання.
          </p>
          <Link
            to='https://t.me/r1nozaki'
            target='_blank'
            className='text-white bg-[#F73149] py-3 px-5 rounded-md hover:bg-[#D62B40] text-center block  md:inline'
          >
            Написати в підтримку
          </Link>
        </div>
        <div className='w-70 h-70 md:w-100 md:h-100'>
          <img
            src={supportPeople}
            alt='support'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
      <div className='w-full mb-10 lg:mb-20'>
        <h3 className='text-white mb-5 text-xl md:text-4xl font-semibold text-center md:text-left'>
          Як ми можемо допомогти?
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {supportContent.map(({ icon, title, link, btnText, target }) => (
            <SupportCard
              key={title}
              icon={icon}
              title={title}
              link={link}
              btnText={btnText}
              target={target}
            />
          ))}
        </div>
      </div>
      <div className='w-full mb-10'>
        <SupportForm />
      </div>
      <div className='w-full bg-[#F73149] rounded-lg p-5 text-center h-62'>
        <h3 className='text-white text-xl font-bold mb-3'>
          Термінова ситуація?
        </h3>
        <ol className='text-white text-base list-decimal w-80 mx-auto text-left '>
          <li>Подзвони на 102 (поліція)</li>
          <li>Подзвонити друзям чи родичам</li>
          <li>Повідом про користувача модераторам</li>
        </ol>
        <Link
          to='https://t.me/r1nozaki'
          target='_blank'
          className='text-black  bg-white rounded-2xl p-4 block mt-5 w-70 mx-auto hover:border hover:border-black'
        >
          Зв'язатися з нами
        </Link>
      </div>
    </div>
  );
};

export default SupportContent;
