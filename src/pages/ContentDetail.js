import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ContentDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const savedContent = JSON.parse(localStorage.getItem('content') || '[]');
    const foundItem = savedContent.find(content => content.id.toString() === id);
    setItem(foundItem);
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-detail">
      <h1>{item.title}</h1>
      {item.type === 'article' && <img src={item.image} alt={item.title} />}
      <div dangerouslySetInnerHTML={{ __html: item.content }} />
      {item.type === 'initiative' && (
        <button className="join-button">הצטרפו ליוזמה</button>
      )}
    </div>
  );
};

export default ContentDetail;