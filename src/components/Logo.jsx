import { Link } from 'react-router';
import LogoIcon from '../assets/Logo.svg';
import LogoPhone from '../assets/LogoPhone.svg';

const Logo = () => {
  return (
    <>
      <Link to='/' className='md:flex items-center hidden'>
        <img src={LogoIcon} alt='loomi' className='w-full h-full' />
      </Link>
      <Link to='/' className='flex items-center md:hidden'>
        <img src={LogoPhone} alt='loomi' className='w-full h-full' />
      </Link>
    </>
  );
};

export default Logo;
