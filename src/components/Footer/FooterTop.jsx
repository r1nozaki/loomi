import { Link } from 'react-router';
import Socials from '../Socials';

const FooterTop = () => {
  const rulesSafetyLinks = [
    { path: '/policy', label: 'Політика конфіденційності' },
    { path: '/terms', label: 'Умови користування' },
    { path: '/safety', label: 'Поради з безпеки' },
    { path: '/contact', label: 'Повідомити про проблему' },
  ];

  const infoAboutProjectLinks = [
    { path: '/about', label: 'Про нас' },
    { path: '/mission', label: 'Наша місія' },
    { path: '/team', label: 'Команда' },
    { path: '/partner', label: 'Партнери / підтримка університету' },
  ];

  const supportLinks = [
    { path: '/faq', label: 'FAQ(поширені запитання)' },
    { path: '/support', label: 'Центр підтримки' },
    { path: '/contact', label: 'Контакти' },
    { path: '/instruction', label: 'Інструкція для новачків' },
  ];
  return (
    <div className='w-full px-15  '>
      <div className='flex items-center justify-between w-full max-w-screen-2xl m-auto border-b-3 border-[#494949] py-15.5'>
        <div className='flex gap-35 text-white'>
          <div>
            <h3 className='font-bold text-lg mb-2.5'>Правила та безпека</h3>
            <ul className='flex flex-col items-center'>
              {rulesSafetyLinks.map(({ path, label }) => (
                <li key={label} className='w-full'>
                  <Link
                    to={path}
                    className='text-base transition-colors duration-300 hover:text-[#F73149]'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-bold text-lg mb-2.5'>Інформація про проєкт</h3>
            <ul className='flex flex-col items-center'>
              {infoAboutProjectLinks.map(({ path, label }) => (
                <li key={label} className='w-full'>
                  <Link
                    to={path}
                    className='text-base transition-colors duration-300 hover:text-[#F73149]'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-bold text-lg mb-2.5'>Підтримка</h3>
            <ul className='flex flex-col items-center'>
              {supportLinks.map(({ path, label }) => (
                <li key={label} className='w-full'>
                  <Link
                    to={path}
                    className='text-base transition-colors duration-300 hover:text-[#F73149]'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-bold text-lg mb-2.5'>Соціальні мережі</h3>
            <Socials />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
