import Logo from '../Logo';
import HeaderNavigation from './HeaderNavigation';
import HeaderSignIn from './HeaderSignIn';
const Header = () => {
  return (
    <header className='fixed top-0 left-0 z-50 flex justify-between items-center w-full bg-[#F73149] h-25 px-5'>
      <Logo />
      <nav>
        <ul className='flex items-center justify-center gap-16'>
          <HeaderNavigation />
        </ul>
      </nav>
      <div>
        <HeaderSignIn />
      </div>
    </header>
  );
};

export default Header;
