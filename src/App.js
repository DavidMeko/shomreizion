import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Vision from './pages/Vision';
import Contact from './pages/Contact';
import Ideas from './pages/Ideas';
import Admin from './pages/Admin';
import ContentDetail from './pages/ContentDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <Link to="/">בית</Link>
            <Link to="/vision">חזון</Link>
            <Link to="/ideas">רעיונות</Link>
            <Link to="/contact">צרו קשר</Link>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/content/:id" element={<ContentDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;