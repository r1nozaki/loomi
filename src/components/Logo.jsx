import { Link } from 'react-router';
import LogoIcon from '../assets/Logo.svg';

const Logo = () => {
  return (
    <Link to='/' className='flex items-center'>
      <img src={LogoIcon} alt='loomi' className='w-full h-full' />
      <h1 className='text-3xl text-white'>loomi</h1>
    </Link>
  );
};

export default Logo;
