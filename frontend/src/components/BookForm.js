// BookForm.js
import React, { useState } from 'react';

function BookForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    ISBN: '',
    publisher: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} />
      </div>
      <div>
        <label>ISBN:</label>
        <input type="text" name="ISBN" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label>Publisher:</label>
        <input type="text" name="publisher" value={formData.title} onChange={handleChange} />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
