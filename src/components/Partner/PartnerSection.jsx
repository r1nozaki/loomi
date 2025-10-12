import PartnerContent from './PartnerContent';
import bgPartner from '../../assets/backrounds/bgPartner.png';

const PartnerSection = () => {
  return (
    <section
      className='w-full min-h-screen flex justify-center px-5 md:px-23'
      style={{
        backgroundImage: `url(${bgPartner})`,
        backgroundSize: 'cover',
      }}
    >
      <PartnerContent />
    </section>
  );
};

export default PartnerSection;
