import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const context = require.context('../pages/articles', false, /\.js$/);
      const articles = await Promise.all(
        context.keys().map(async (key) => {
          const module = await import(`../pages/articles${key.slice(1)}`);
          return module.metadata;
        })
      );
      setArticles(articles);
    };

    loadArticles();
  }, []);

  return (
    <div className="articles-page">
      <h1>Articles</h1>
      <div className="articles-grid">
        {articles.map((article) => (
          <Link to={`/article/${article.id}`} key={article.id} className="article-card">
            {article.image && <img src={`/articles/img/${article.image}`} alt={article.title} />}
            <h2>{article.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;