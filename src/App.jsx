import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
