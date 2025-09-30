import { Link } from 'react-router';
import FAQCard from './FAQCard';
import faqContent from '../../data/FAQCardContent';
const FAQContent = () => {
  return (
    <>
      <div className='flex flex-col items-center gap-4 mb-5'>
        <h1 className='text-2xl md:text-5xl font-bold text-white text-center md:text-left'>
          Маєш питання? Ми маємо відповіді 👇
        </h1>
        <p className=' text-base md:text-lg text-center md:text-left text-white/80 '>
          Тут зібрали найчастіші питання від студентів про знайомства безпеку та
          наш застосунок
        </p>
      </div>
      <div className='w-full max-w-5xl mx-auto flex flex-col gap-3 mt-0 md:mt-10 lg:mt-20'>
        {faqContent.map(faq => (
          <FAQCard
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
      <Link
        to='/support'
        className='w-full max-w-3xl h-16 md:h-12 rounded-xl mx-auto block bg-[#F73149] text-center py-2.5 text-white mt-5 transition-colors duration-300 hover:bg-[#D62B40] '
      >
        Не знайшлось найти відповідь? Напиши нам 📩
      </Link>
    </>
  );
};

export default FAQContent;
