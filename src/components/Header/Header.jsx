import { useState } from 'react';
import { Link } from 'react-router';
import Logo from '../Logo';
import HeaderNavigation from './HeaderNavigation';
import HeaderSignIn from './HeaderSignIn';

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  return (
    <header className='fixed top-0 left-0 z-50 flex justify-between items-center w-full bg-[#F73149] h-15 px-5'>
      <div className='flex items-center'>
        <Logo />{' '}
        <Link to='/' className='text-3xl text-white'>
          loomi
        </Link>
      </div>
      <nav>
        <ul className='flex items-center justify-center gap-16'>
          <HeaderNavigation />
        </ul>
      </nav>
      <div>
        <HeaderSignIn
          setSignInModal={setSignInModal}
          signInModal={signInModal}
        />
      </div>
    </header>
  );
};

export default Header;
