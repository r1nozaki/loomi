const HowWeWorkCard = ({ icon, title }) => {
  return (
    <div className='w-70 h-70 rounded-lg flex flex-col gap-3 items-center justify-center shadow-lg bg-black/20 transition-all duration-300 border border-[#272727] hover:border-[#F73149] hover:translate-y-4'>
      {icon}
      <h2 className='text-lg text-white text-center'>{title}</h2>
    </div>
  );
};

export default HowWeWorkCard;
