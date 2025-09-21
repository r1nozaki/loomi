import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      {<Header />}
      {<main className='pt-15 relative min-h-screen'>{children}</main>}
      {<Footer />}
    </>
  );
};

export default Layout;
