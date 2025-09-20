import { Link } from 'react-router';
import LogoIcon from '../assets/Logo.svg';

const Logo = () => {
  return (
    <Link to='/' className='flex items-center'>
      <img src={LogoIcon} alt='loomi' className='w-full h-full' />
    </Link>
  );
};

export default Logo;
