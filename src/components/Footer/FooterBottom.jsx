const FooterBottom = () => {
  return (
    <div className='w-full py-7 px-15'>
      <div className=' flex justify-between items-center max-w-screen-2xl m-auto'>
        <p className='text-white text-sm'>
          <span className=''>Design by loomi.</span>
          <span>
            {' '}
            Powered by{' '}
            <a
              href='https://github.com/andriydrob'
              alt='GitHub account'
              target='_blank'
              className='underline'
            >
              Drob Andriy
            </a>
          </span>
        </p>
        <p className='text-white text-sm'>
          © 2025 Loomi, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
