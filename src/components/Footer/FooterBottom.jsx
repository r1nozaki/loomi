import { Link } from 'react-router';

const FooterBottom = () => {
  return (
    <div className='w-full py-7 px-15'>
      <div className=' flex justify-between items-center max-w-screen-2xl m-auto'>
        <p className='text-white text-xl'>
          <span className=''>Дизайн: loomi.</span>
          <span>
            {' '}
            Розробка:{' '}
            <a
              href='https://github.com/andriydrob'
              alt='GitHub account'
              target='_blank'
              className='underline'
            >
              Дроб Андрій
            </a>
          </span>
        </p>
        <p className='text-white text-xl'>
          © 2025 Loomi, Inc., всі права застережені.
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
