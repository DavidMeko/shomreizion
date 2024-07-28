import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [starredArticles, setStarredArticles] = useState([]);

  useEffect(() => {
    const savedContent = JSON.parse(localStorage.getItem('content') || '[]');
    const filteredArticles = savedContent
      .filter(item => item.type === 'article' && item.starred)
      .slice(0, 3);
    setStarredArticles(filteredArticles);
  }, []);

  return (
    <div className="home">
      <h1>שומרי ציון</h1>
      <p className="tagline">למען עתיד יהודי חזק ומאוחד</p>
      
      <div className="button-container">
        <Link to="/contact" className="button">הצטרפו אלינו</Link>
      </div>
      
      <h2>מאמרים מומלצים</h2>
      <div className="article-grid">
        {starredArticles.map((article) => (
          <Link to={`/content/${article.id}`} key={article.id} className="article-card">
            <img src={article.image} alt={article.title} />
            <div className="article-content">
              <h3>{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;