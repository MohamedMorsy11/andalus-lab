import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Admin from './pages/Admin';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;
