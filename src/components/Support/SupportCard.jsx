import { Link } from 'react-router';

const SupportCard = ({ icon, title, link, btnText, target }) => {
  return (
    <div className='w-full max-w-3xl h-40 bg-black/20 flex items-center gap-5 p-5 rounded-md'>
      {icon}
      <div className='flex flex-col gap-2'>
        <h2 className='text-white text-lg'>{title}</h2>
        <Link
          to={link}
          target={target}
          className='border-1 border-gray-200/20 rounded-md text-center text-white py-1 px-3 bg-[#272727] hover:bg-black'
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
};

export default SupportCard;
