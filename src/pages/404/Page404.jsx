import FuzzyText from '../../components/UI/FuzzyText';
import Logo from '../../assets/icons/Logo.svg';

const Page404 = () => {
  return (
    <section className='min-h-screen flex justify-center bg-[#272727]'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='w-30 h-30'>
          <img src={Logo} alt='logo' className='w-full h-full' />
        </div>
        <div className='flex flex-col items-center gap-5'>
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            color='#F73149'
            fontSize='7rem'
          >
            404
          </FuzzyText>
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            color='#F73149'
            fontSize='7rem'
          >
            not found
          </FuzzyText>
        </div>
      </div>
    </section>
  );
};

export default Page404;
