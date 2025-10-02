import ContactForm from './ContactForm';
import Socials from '../common/Socials';
import { MapPin, PhoneCall, Mail } from 'lucide-react';
const ContactContent = () => {
  return (
    <div className='w-full max-w-4xl'>
      <div className='mb-5 md:mb-10 lg:mb-20'>
        <h1 className='text-2xl md:text-5xl font-bold text-white text-center mb-3'>
          Зв'яжись з нами
        </h1>
        <p className='text-base md:text-lg text-white/80 text-center'>
          Ми завжди на зв'язку, щоб допомогти тобі
        </p>
      </div>
      <div className='flex flex-col md:flex-row items-center gap-10'>
        <div className='w-full max-w-2xl'>
          <ContactForm />
        </div>
        <div className='flex flex-col gap-4 w-full max-w-2xl items-center md:items-start'>
          <div className='flex gap-2 items-center'>
            <MapPin color='#F73149' />
            <span className='text-white text-base md:text-lg'>
              Київ, Україна
            </span>
          </div>
          <div className='flex gap-2 items-center'>
            <PhoneCall color='#F73149' />
            <span className='text-white text-base md:text-lg'>
              +38(067)555-12-34
            </span>
          </div>
          <div className='flex gap-2 items-center'>
            <Mail color='#F73149' />
            <span className='text-white text-base md:text-lg'>
              loomisupport@gmail.com
            </span>
          </div>
          <Socials
            contact={true}
            className='justify-center md:justify-start text-white'
          />
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
