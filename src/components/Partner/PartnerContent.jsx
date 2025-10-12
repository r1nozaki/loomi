import PartnerLogo from '../../assets/icons/PartnerLogo.png';

const PartnerContent = () => {
  return (
    <div className='flex flex-col md:flex-row items-center gap-10 md:gap-20 justify-center'>
      <div className='w-70 md:w-100'>
        <img
          src={PartnerLogo}
          alt='DUIKT logo'
          className=' w-full h-full object-cover'
        />
      </div>
      <div>
        <h1 className='text-2xl md:text-5xl font-bold text-white text-center md:text-left mb-5'>
          Підтримка університету
        </h1>
        <p className='text-base md:text-lg text-white text-center md:text-left md:w-150 mb-5'>
          Ми вдяні нашому університету - Державному університету
          інформаційно-комунікаційних технологій (ДУІКТ) - за підтримку,
          можливості розвитку та натхнення для створення цього проекту.
        </p>
        <a
          href='https://duikt.edu.ua/ua/'
          target='_blank'
          className='text-white bg-[#F73149] py-3 md:px-10 rounded-md transition-colors duration-300  hover:bg-[#D62B40] text-center block w-100 mx-auto md:inline'
        >
          Дізнатися більше про ДУІКТ
        </a>
      </div>
    </div>
  );
};

export default PartnerContent;
