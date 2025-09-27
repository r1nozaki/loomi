import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
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
