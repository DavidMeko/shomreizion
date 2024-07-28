import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">בית</Link>
        <Link to="/vision">חזון</Link>
        <Link to="/contact">צרו קשר</Link>
      </nav>
    </header>
  );
};

export default Header;