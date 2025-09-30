import { Outlet } from 'react-router';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import ScrollToTop from './helpers/ScrollToTop';

import './App.css';

const App = () => {
  return (
    <>
      <ScrollToTop />
      {<Header />}
      {
        <main className='pt-15 relative min-h-screen'>
          <Outlet />
        </main>
      }
      {<Footer />}
    </>
  );
};

export default App;
