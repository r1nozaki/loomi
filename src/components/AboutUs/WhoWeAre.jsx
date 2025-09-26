import { Link } from 'react-router';
import Btn from '../UI/Btn';

import StudentTeam from '../../assets/studentTeam.png';

const WhoWeAre = () => {
  return (
    <section className='w-full px-5 md:px-23 min-h-screen bg-[#272727] relative  grid grid-cols-1 md:grid-cols-2 items-center md:gap-5 '>
      <div className='w-full row-start-2 md:row-start-1'>
        <h2 className='w-full font-semibold text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4 text-white'>
          Хто ми?
        </h2>
        <p className='w-full text-base text-white/80 mb-4'>
          Ми — платформа знайомств, створена спеціально для студентів України.
          Тут ти знайдеш тих, хто живе твоїм ритмом: пари, сесії, гуртожитки,
          вечірки й мрії про майбутнє.
        </p>
        <h2 className='w-full font-semibold text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4 text-white'>
          Чому ми?
        </h2>
        <p className='w-full text-base text-white/80 mb-4'>
          Бо ми розуміємо, що студентське життя — це час нових друзів, пригод і
          почуттів. У нашій спільноті немає зайвого пафосу чи випадкових людей —
          тільки ті, хто близький тобі за віком, інтересами та цінностями.
        </p>
        <h2 className='w-full font-semibold text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4 text-white'>
          Наша мета
        </h2>
        <p className='w-full text-base text-white/80 mb-4'>
          Ми хочемо зробити знайомства простими, щирими й безпечними. Допомогти
          тобі знайти нових друзів, команду для навчання чи навіть перше
          справжнє кохання.
        </p>
        <h2 className='w-full font-semibold text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4 text-white'>
          Що нас відрізняє
        </h2>
        <ul className='list-disc text-white/80 pl-5 text-base'>
          <li>Студентська атмосфера та зрозуміла аудиторія.</li>
          <li>
            Функції, що допомагають знайти саме тих, хто поруч — у твоєму місті
            чи навіть університеті.
          </li>
          <li>Простота, легкість і без зайвих ускладнень.</li>
        </ul>
      </div>
      <div className='relative w-full h-0 pb-[85%] rounded-lg overflow-hidden mb-5 mt-10 md:mt-0 md:mb-0'>
        <img
          src={StudentTeam}
          loading='lazy'
          alt='Student team'
          className='absolute top-0 right-0 w-full h-full object-cover object-center'
        />
      </div>
      <Link to='/' className='w-36 mx-auto col-span-2 mt-10 md:mt-0'>
        <Btn>Почати</Btn>
      </Link>
    </section>
  );
};

export default WhoWeAre;
