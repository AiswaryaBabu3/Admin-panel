// Product.jsx
import React, { useState, useEffect } from 'react';
import * as TiIcons from 'react-icons/ti';
import ProductTable from './Products/Producttable';
import ProductForm from './Products/ProductForm'


const Product = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9092/api/get-products');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (productToEdit) => {
    setProductToEdit(productToEdit);
    setEditMode(true);
    setShowForm(true);
  };

  const handleToggleSelect = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId) ? prevSelected.filter((id) => id !== itemId) : [...prevSelected, itemId]
    );
  };

  const handleFormSubmit = async (formData, editMode) => {
    try {
      const url = editMode
        ? `http://localhost:9092/api/update-product/${productToEdit.id}`
        : 'http://localhost:9092/api/save-product';

      const response = await fetch(url, {
        method: editMode ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`Product ${editMode ? 'updated' : 'saved'} successfully`);
        fetchData();
        setProductToEdit(null);
        setEditMode(false);
        setShowForm(false);
      } else {
        console.error(`Error ${editMode ? 'updating' : 'saving'} product:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'saving'} product:`, error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await fetch('http://localhost:9092/api/delete-products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedItems }),
      });

      if (response.ok) {
        console.log('Products deleted successfully');
        fetchData();
        setSelectedItems([]);
      } else {
        console.error('Error deleting products:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="head">
        Product
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className="adding">
            <TiIcons.TiPlus />
          </button>
        ) : (
          <button onClick={() => setShowForm(false)} className="adding">
            <TiIcons.TiArrowBack />
          </button>
        )}
      </h1>
      {showForm ? (
        // Pass the necessary props to the ProductForm component
        // You may need to adjust the prop names based on your actual implementation
        <ProductForm
          onFormSubmit={handleFormSubmit}
          initialFormData={productToEdit}
          editMode={editMode}
          onCloseForm={() => setShowForm(false)}
        />
      ) : (
        // Pass the necessary props to the ProductTable component
        // You may need to adjust the prop names based on your actual implementation
        <ProductTable
          data={data}
          onEdit={handleEditClick}
          selectedItems={selectedItems}
          onToggleSelect={handleToggleSelect}
          onDeleteSelected={handleDeleteSelected}
        />
      )}
    </div>
  );
};

export default Product;
