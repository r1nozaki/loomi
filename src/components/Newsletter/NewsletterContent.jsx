import NewsletterForm from './NewsletterForm';
const NewsletterContent = () => {
  return (
    <>
      <div className='w-full text-white mb-5 md:mb-0 md:w-[45%] lg:w-[40%] xl:w-[35%]'>
        <h3 className='w-full font-semibold text-2xl mb-2'>
          Підпишись на нашу розсилку
        </h3>
        <p className='text-base'>
          Будь в курсі найцікавіших знайомств та студентських історій! Отримуй
          ексклюзивний контент та свіжі новини прямо на пошту.
        </p>
      </div>
      <NewsletterForm />
    </>
  );
};

export default NewsletterContent;
