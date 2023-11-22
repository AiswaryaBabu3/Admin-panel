import React, { useState } from 'react';
import 'bootstrap';
import './Prouct.css'

const ProductForm = ({ onFormSubmit, initialFormData, editMode }) => {
  const [formData, setFormData] = useState(initialFormData || { name: '', description: '', price: '', category: '' });
  const [errors, setErrors] = useState({});

  const handleFormSubmit = () => {
    // Basic validation 
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (Object.keys(newErrors).length === 0) {
      // No validation errors, submit the form
      onFormSubmit(formData, editMode);
      // Clear the form
      setFormData({ name: '', description: '', price: '', category: '',quantity: '',offerprice: '',startdate: '',enddate: '',image: '' });
      setErrors({});
    } else {
      // Update the error state
      setErrors(newErrors);
    }
  };

  return (
    <div>
     
      <form className='form'>
      <div style={{ marginBottom: '10px' }}>
  <label>Category:</label>
  <label>Select an option:</label>
        <select>
          <option value="">Select an option</option>
          <option value="option1">Furniture</option>
          <option value="option2">Dress</option>
          <option value="option3">Cosmetics</option>
          <option value="option3">Groccery</option>
          <option value="option3">Stationeries</option>
        </select>
</div>
        <div style={{ marginBottom: '10px' }}>
          <label>Name: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.name}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Quantity: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.quantity}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Price: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.price}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label> Offer Price: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="number"
            name="offerprice"
            placeholder="Offer Price"
            value={formData.offerprice}
            onChange={(e) => setFormData({ ...formData, offerprice: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.price}</div>
        </div>
      
        <div style={{ marginBottom: '10px' }}>
          <label>Start date: <span style={{ color: 'red' }}>*</span></label>
          <input 
            type="date"
            name="startdate"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, startdate: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.startdate}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>End date: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="date"
            name="enddate"
            placeholder="Date"
            value={formData.enddatedate}
            onChange={(e) => setFormData({ ...formData, enddate: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.enddate}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Image: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="file"
            name="image"
            placeholder="Image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.image}</div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <button onClick={handleFormSubmit} style={{ color: 'white', padding: '5px 10px' }} className='save-btn'>
        {editMode ? 'Update' : 'Save' }
      </button>
      </form>
    </div>
  );
};

export default ProductForm;
