const TipsCard = ({ icon, tip }) => {
  return (
    <div className='w-90 h-90 rounded-lg flex flex-col gap-3 justify-center items-center bg-black/20 shadow-lg'>
      {icon}
      <p className='text-base text-white text-center'>{tip}</p>
    </div>
  );
};

export default TipsCard;
