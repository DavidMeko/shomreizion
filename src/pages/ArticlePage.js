import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const [Article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const module = await import(`../pages/articles/article-${id}.js`);
        setArticle(module.default);
      } catch (error) {
        console.error('Failed to load article:', error);
      }
    };

    loadArticle();
  }, [id]);

  if (!Article) {
    return <div>Loading...</div>;
  }

  return <Article />;
};

export default ArticlePage;