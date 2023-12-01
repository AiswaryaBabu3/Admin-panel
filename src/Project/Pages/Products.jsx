import React, { useState, useEffect } from 'react';
import * as TiIcons from 'react-icons/ti';
import ProductForm from './Products/ProductForm';
import ProductTable from './Products/Producttable';
import './Products/Prouct.css';

const Product = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

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

  const handleEditClick = (categoryToEdit) => {
    setCategoryToEdit(categoryToEdit);
    setEditMode(true);
    setShowForm(true);
  };

  const handleToggleSelect = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId) ? prevSelected.filter((id) => id !== itemId) : [...prevSelected, itemId]
    );
  };

  const handleGoBack = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (formData, editMode) => {
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });
  
      const url = editMode
        ? `http://localhost:9093/api/update-product/${categoryToEdit.id}`
        : 'http://localhost:9093/api/save-product';
  
      console.log('URL:', url);
      console.log('Form Data:', formData);
  
      const response = await fetch(url, {
        method: editMode ? 'PUT' : 'POST',
        body: form,
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        console.log(`Product ${editMode ? 'updated' : 'saved'} successfully`);
        fetchData();
        setCategoryToEdit(null);
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
          <button onClick={handleGoBack} className="adding">
            <TiIcons.TiArrowBack />
          </button>
        )}
      </h1>
      {showForm ? (
        <ProductForm
          onFormSubmit={handleFormSubmit}
          initialFormData={categoryToEdit}
          editMode={editMode}
          onCloseForm={handleGoBack}
        />
      ) : (
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
