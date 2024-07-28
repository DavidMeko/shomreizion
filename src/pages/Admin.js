import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminPage = () => {
  const [content, setContent] = useState([]);
  const [newItem, setNewItem] = useState({ type: 'article', title: '', content: '', image: '', starred: false });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedContent = JSON.parse(localStorage.getItem('content') || '[]');
    setContent(savedContent);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setNewItem(prev => ({ ...prev, content: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContent = [...content, { ...newItem, id: Date.now() }];
    setContent(updatedContent);
    localStorage.setItem('content', JSON.stringify(updatedContent));
    setNewItem({ type: 'article', title: '', content: '', image: '', starred: false });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedContent = content.filter(item => item.id !== id);
      setContent(updatedContent);
      localStorage.setItem('content', JSON.stringify(updatedContent));
    }
  };

  const handleStar = (id) => {
    const updatedContent = content.map(item => 
      item.id === id ? { ...item, starred: !item.starred } : item
    );
    setContent(updatedContent);
    localStorage.setItem('content', JSON.stringify(updatedContent));
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="content-form">
        <select
          name="type"
          value={newItem.type}
          onChange={handleInputChange}
          required
        >
          <option value="article">Article</option>
          <option value="initiative">Future Initiative</option>
        </select>
        <input
          type="text"
          name="title"
          value={newItem.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <ReactQuill
          value={newItem.content}
          onChange={handleContentChange}
          placeholder="Content"
        />
        {newItem.type === 'article' && (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {newItem.image && <img src={newItem.image} alt="Preview" className="image-preview" />}
          </div>
        )}
        <button type="submit">Add {newItem.type === 'article' ? 'Article' : 'Initiative'}</button>
      </form>
      <div className="content-list">
        <h2>Current Content</h2>
        {content.map(item => (
          <div key={item.id} className="content-item">
            <h3>{item.title}</h3>
            <p>Type: {item.type}</p>
            {item.type === 'article' && (
              <button onClick={() => handleStar(item.id)} className={`star-button ${item.starred ? 'starred' : ''}`}>
                {item.starred ? '★' : '☆'}
              </button>
            )}
            <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;