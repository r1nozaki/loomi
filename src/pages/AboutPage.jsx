import WhyUs from '../components/AboutUs/WhyUs';
import WhoWeAre from '../components/AboutUs/WhoWeAre';
import Banner from '../components/Banner';
const AboutPage = () => {
  return (
    <>
      <WhyUs />
      <div className='px-23 bg-[#272727] text-white pt-10'>
        <Banner
          title={'Твої історії починаються тут'}
          text={
            'Ми віримо, що студентські знайомства — це більше, ніж свайпи. Це історії, які залишаються з тобою на все життя.'
          }
        />
      </div>
      <WhoWeAre />
    </>
  );
};

export default AboutPage;
