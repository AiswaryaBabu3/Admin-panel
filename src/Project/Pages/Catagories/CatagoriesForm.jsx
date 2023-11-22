import React, { useState } from 'react';
import './Catagories.css';

const CategoriesForm = ({ onFormSubmit, initialFormData, editMode }) => {
  const [formData, setFormData] = useState(initialFormData || { category: '', subcategory: '', description: '' });
  const [errors, setErrors] = useState({});

  const handleFormSubmit = () => {
    const newErrors = {};

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.subcategory.trim()) {
      newErrors.subcategory = 'Subcategory is required';
    }

    if (Object.keys(newErrors).length === 0) {
      onFormSubmit(formData, editMode);
      setFormData({ category: '', subcategory: '', description: '' });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <form className='form'>
        <div style={{ marginBottom: '10px' }}>
          <label>Category: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.category}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Subcategory: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="subcategory"
            placeholder="Subcategory"
            value={formData.subcategory}
            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.subcategory}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            style={{width:'100%'}}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <button onClick={handleFormSubmit} style={{ color: 'white', padding: '5px 10px' }} className='btn-save'>
          {editMode ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CategoriesForm;
