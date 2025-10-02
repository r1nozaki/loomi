const TipsCard = ({ icon, tip }) => {
  return (
    <div className='w-75 h-75 md:w-90 md:h-90 rounded-lg flex flex-col gap-3 justify-center items-center bg-black/20 shadow-lg hover: transition-transform duration-300 hover:border hover:border-[#F73149] hover:translate-y-4'>
      {icon}
      <p className='text-base text-white text-center p-2 md:p-4'>{tip}</p>
    </div>
  );
};

export default TipsCard;
