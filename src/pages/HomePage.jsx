import Header from '../components/Header/Header';
import HeroSection from '../components/Hero/HeroSection';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className='pt-25'>
        <HeroSection />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
