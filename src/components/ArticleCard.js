import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img src={article.image} alt={article.title} />
      <div className="article-card-content">
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <Link to={`/article/${article.id}`}>קרא עוד</Link>
      </div>
    </div>
  );
};

export default ArticleCard;