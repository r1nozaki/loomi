import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { lenis } from '../../lenisInstance';
import useBlockScroll from '../../hooks/useBlockScroll';
import Logo from '../Logo';
import HeaderNavigation from './HeaderNavigation';
import HeaderSignIn from './HeaderSignIn';
import { AnimatePresence, motion } from 'motion/react';

const Header = () => {
  const location = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [signInModal, setSignInModal] = useState(false);

  useBlockScroll(signInModal, lenis);

  useEffect(() => {
    setIsBurgerOpen(false);
  }, [location.pathname]);

  return (
    <header className='fixed top-0 left-0 z-50 flex justify-between items-center w-full bg-[#F73149] h-15 pr-3 md:px-5'>
      <div className='flex items-center'>
        <Logo />{' '}
        <Link to='/' className='text-3xl text-white'>
          loomi
        </Link>
      </div>
      <button
        className='md:hidden focus:outline-none'
        onClick={() => setIsBurgerOpen(!isBurgerOpen)}
      >
        {isBurgerOpen ? (
          <X color='#ffffff' size={28} />
        ) : (
          <Menu color='#ffffff' size={28} />
        )}
      </button>
      {isBurgerOpen && (
        <AnimatePresence>
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='absolute top-14 left-0 w-full flex flex-col items-center gap-6 p-4 shadow-lg z-40 md:hidden bg-[#F73149]'
          >
            <ul className='flex flex-col md:flex-row items-center justify-center gap-5 md:gap-16'>
              <HeaderNavigation />
            </ul>
          </motion.nav>
        </AnimatePresence>
      )}
      <nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className='hidden md:flex md:flex-row '
      >
        <ul className='flex items-center justify-center gap-16'>
          <HeaderNavigation />
        </ul>
      </nav>
      <div className='hidden md:flex'>
        <HeaderSignIn
          setSignInModal={setSignInModal}
          signInModal={signInModal}
        />
      </div>
    </header>
  );
};

export default Header;
