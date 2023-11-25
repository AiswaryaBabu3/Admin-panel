import React, { useState } from 'react';
import './Catagories.css';

const CategoriesForm = ({ onFormSubmit, initialFormData, editMode }) => {
  const [formData, setFormData] = useState(initialFormData || { Catagory: '', SubCatagory: '', Description: '' });
  const [errors, setErrors] = useState({});

  const handleFormSubmit = () => {
    const newErrors = {};

    if (!formData.Catagory.trim()) {
      newErrors.Catagory = 'Category is required';
    }

    if (!formData.SubCatagory.trim()) {
      newErrors.SubCatagory = 'Subcategory is required';
    }

    if (Object.keys(newErrors).length === 0) {
      onFormSubmit(formData);
      setFormData({ Catagory: '', SubCatagory: '', Description: '' });
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
            value={formData.Catagory}
            onChange={(e) => setFormData({ ...formData, Catagory: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.Catagory}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Subcategory: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="subcategory"
            placeholder="Subcategory"
            value={formData.SubCatagory}
            onChange={(e) => setFormData({ ...formData, SubCatagory: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.SubCatagory}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.Description}
            style={{width:'100%'}}
            onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
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