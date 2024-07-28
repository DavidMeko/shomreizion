import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IdeasPage = () => {
  const [content, setContent] = useState({ initiatives: [], articles: [] });

  useEffect(() => {
    const savedContent = JSON.parse(localStorage.getItem('content') || '[]');
    const initiatives = savedContent.filter(item => item.type === 'initiative');
    const articles = savedContent.filter(item => item.type === 'article');
    setContent({ initiatives, articles });
  }, []);

  return (
    <div className="ideas-page">
      <h1>רעיונות ומאמרים</h1>
      <p className="ideas-intro">כאן תוכלו למצוא רעיונות חדשניים לחיזוק הקהילה היהודית והזהות הישראלית, לצד מאמרים מעניינים בנושאים אלו. אנו מזמינים אתכם לקחת חלק ביוזמות אלו ולהציע רעיונות משלכם.</p>
      
      <h2>יוזמות עתידיות</h2>
      <div className="ideas-grid">
        {content.initiatives.map((initiative) => (
          <Link to={`/content/${initiative.id}`} key={initiative.id} className="idea-card">
            <h3>{initiative.title}</h3>
          </Link>
        ))}
      </div>
      
      <h2>מאמרים אחרונים</h2>
      <div className="articles-grid">
        {content.articles.map((article) => (
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

export default IdeasPage;