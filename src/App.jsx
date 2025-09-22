import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import ReportProblemSection from './components/ReportProblem/ReportProblemSection';
import Layout from './components/Layout';
import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/policy' element={<PrivacyPolicyPage />} />
            <Route path='/terms' element={<TermsConditionsPage />} />
            <Route path='/problem' element={<ReportProblemSection />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
