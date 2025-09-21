const Banner = ({ title, text }) => {
  return (
    <section className='relative w-full text-center px-5 md:px-10 py-12 md:py-16 lg:py-20 rounded-md bg-black/20'>
      <h2 className='w-full font-semibold text-3xl md:text-4xl lg:text-5xl xl:text-6xl lg:leading-[3.5rem] xl:leading-[4.25rem] mb-3 md:mb-4 last:mb-0'>
        {title}
      </h2>
      <p className='sm:max-w-[500px] sm:m-auto text-base'>{text}</p>
    </section>
  );
};

export default Banner;
