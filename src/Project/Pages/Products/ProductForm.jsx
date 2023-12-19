import React, { useState, useEffect } from 'react';
import './Prouct.css';

const ProductForm = ({ onFormSubmit, initialFormData, editMode, onCloseForm }) => {
  const [formData, setFormData] = useState(
    initialFormData || {
      id: '', // Ensure the id property is included
      category: '',
      subcategory: '',
      quantity: '',
      price: '',
      offerprice: '',
      startdate: '',
      enddate: '',
      image: null,
    }
  );
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:9091/fetch-categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const fetchSubcategories = async (selectedCategory) => {
    try {
      const response = await fetch(`http://localhost:9091/fetch-subcategories?category=${selectedCategory}`);
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setFormData({
      ...formData,
      category: selectedCategory,
      subcategory: '',
    });

    fetchSubcategories(selectedCategory);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file }); // Store the file data, not just the name
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleFormSubmit = async () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.subcategory) newErrors.subcategory = 'Subcategory is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be a positive number';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be a positive number';
    if (!formData.offerprice || formData.offerprice <= 0) newErrors.offerprice = 'Offer price must be a positive number';
    if (!formData.startdate) newErrors.startdate = 'Start date is required';
    if (!formData.enddate) newErrors.enddate = 'End date is required';

    
    if (Object.keys(newErrors).length === 0) {
      try {
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
          form.append(key, formData[key]);
        });
  
        const url = editMode
          ? `http://localhost:9092/api/update-product/${formData.id}` // Use formData.id for editing
          : 'http://localhost:9092/api/save-product';
  
        const response = await fetch(url, {
          method: editMode ? 'PUT' : 'POST',
          body: form,
        });

        if (response.ok) {
          console.log('Product saved successfully');
          onFormSubmit(formData, editMode);
          setFormData({
            category: '',
            subcategory: '',
            quantity: '',
            price: '',
            offerprice: '',
            startdate: '',
            enddate: '',
            image: null,
          });
          onCloseForm();
        } else {
          console.error('Error saving product:', response.statusText);
        }
      } catch (error) {
        console.error(`Error ${editMode ? 'updating' : 'saving'} product:`, error);
      }
    } else {
      setErrors(newErrors);
    }
  }; 
  return (
    <div>
      <form className='form'>
        <div style={{ marginBottom: '10px' }}>
          <label>Category: <span style={{ color: 'red' }}>*</span></label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            required
            className='select'
          >
            <option value="" style={{color:'grey'}}>Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div style={{ color: 'red' }}>{errors.category}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Subcategory: <span style={{ color: 'red' }}>*</span></label>
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            className='select'
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
          <div style={{ color: 'red' }}>{errors.subcategory}</div>
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
          <label>Offer Price: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="number"
            name="offerprice"
            placeholder="Offer Price"
            value={formData.offerprice}
            onChange={(e) => setFormData({ ...formData, offerprice: e.target.value })}
            required
          />
          <div style={{ color: 'red' }}>{errors.offerprice}</div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Start date: <span style={{ color: 'red' }}>*</span></label>
          <input
            type="date"
            name="startdate"
            placeholder="Start Date"
            value={formData.startdate}
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
            placeholder="End Date"
            value={formData.enddate}
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
            onChange={handleImageChange}
            required
          />
          <div style={{ color: 'red' }}>{errors.image}</div>
        </div>
        {selectedImage && (
          <div style={{ marginBottom: '10px' }}>
            <label>Selected Image:</label>
            <img src={selectedImage} alt="Selected" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </div>
        )}
        <button onClick={handleFormSubmit} style={{ color: 'white', padding: '5px 10px' }} className='save-btn'>
          {editMode ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;