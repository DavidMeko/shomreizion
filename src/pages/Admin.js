import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminPage = () => {
  const [content, setContent] = useState([]);
  const [newItem, setNewItem] = useState({ type: 'article', title: '', content: '', image: '', starred: false });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token with the server
      fetch('/api/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true);
          fetchContent();
        } else {
          localStorage.removeItem('adminToken');
        }
      });
    }
  }, []);

  const fetchContent = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('/api/content', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        throw new Error('Failed to fetch content');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
        fetchContent();
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newItem),
      });
      
      if (response.ok) {
        await fetchContent();
        setNewItem({ type: 'article', title: '', content: '', image: '', starred: false });
      } else {
        throw new Error('Failed to add content');
      }
    } catch (error) {
      console.error('Error adding content:', error);
      alert('An error occurred while adding content');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await fetch(`/api/content/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          await fetchContent();
        } else {
          throw new Error('Failed to delete content');
        }
      } catch (error) {
        console.error('Error deleting content:', error);
        alert('An error occurred while deleting content');
      }
    }
  };

  const handleStar = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`/api/content/${id}/star`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        await fetchContent();
      } else {
        throw new Error('Failed to update star status');
      }
    } catch (error) {
      console.error('Error updating star status:', error);
      alert('An error occurred while updating star status');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
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