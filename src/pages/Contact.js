import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    help: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', reason: '', help: '' });
    alert('תודה על פנייתך. נחזור אליך בהקדם.');
  };

  return (
    <div className="contact-page">
      <h1>צרו קשר</h1>
      <p className="contact-intro">אנו מזמינים אתכם להצטרף אלינו במשימתנו החשובה. אנא מלאו את הטופס הבא ונחזור אליכם בהקדם.</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">שם מלא</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">כתובת אימייל</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">מדוע תרצו להצטרף אלינו?</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="help">כיצד תוכלו לעזור לנו?</label>
          <textarea
            id="help"
            name="help"
            value={formData.help}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">שליחה</button>
      </form>
    </div>
  );
};

export default ContactPage;