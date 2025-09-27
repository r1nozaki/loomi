import WhyUs from '../components/AboutUs/WhyUs';
import WhoWeAre from '../components/AboutUs/WhoWeAre';
import Banner from '../components/UI/Banner';
import Newsletter from '../components/Newsletter/Newsletter';
const AboutPage = () => {
  return (
    <>
      <WhyUs />
      <div className='px-5 md:px-23 bg-[#272727] text-white pt-10'>
        <Banner
          title={'Твої історії починаються тут'}
          text={
            'Ми віримо, що студентські знайомства — це більше, ніж свайпи. Це історії, які залишаються з тобою на все життя.'
          }
        />
      </div>
      <WhoWeAre />
      <div className='px-5 bg-[#272727] pt-10'>
        <Newsletter />
      </div>
    </>
  );
};

export default AboutPage;
