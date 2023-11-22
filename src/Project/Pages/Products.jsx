import React, { useState } from 'react';
import * as TiIcons from 'react-icons/ti';
import Producttable from './Products/Producttable';
import ProductForm from './Products/ProductForm';
import './Products/Prouct.css';

const Product = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  
  const handleFormSubmit = (formData) => {
    if (editMode) {
      // Update data
      const updatedCategories = data.map((category) =>
        category.id === categoryToEdit.id ? { ...categoryToEdit, ...formData } : category
      );
      setData(updatedCategories);
    } else {
      // Add data
      const newCategory = { ...formData, id: Date.now() };
      setData([...data, newCategory]);
    }
    setCategoryToEdit(null);
    setEditMode(false);
  };

  const handleEditClick = (categoryId) => {
    const categoryToEdit = data.find((item) => item.id === categoryId);
    if (categoryToEdit) {
      setCategoryToEdit(categoryToEdit);
      setEditMode(true);
      setShowForm(true);
    }
  };

  const handleToggleSelect = (itemId) => {
    // Toggle selection for the item
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };

  // Handle going back
  const handleGoBack = () => {
    setShowForm(false);
  };

  const onDeleteSelected = () => {
    // Filter out the selected items and update the data state
    const newData = data.filter((item) => !selectedItems.includes(item.id));
    setData(newData);
    // Clear the selectedItems array
    setSelectedItems([]);
  };

  return (
    <div className='container'>
      <h1 className="head">
        Product
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className='adding'>
            <TiIcons.TiPlus />
          </button>
        ) : (
          <button onClick={handleGoBack} className='adding'>
            <TiIcons.TiArrowBack/>
          </button>
        )}
      </h1>
      {showForm ? (
        <ProductForm
          onFormSubmit={handleFormSubmit}
          initialFormData={categoryToEdit}
          editMode={editMode}
        />
        ) : (
          <Producttable
          data={data}
          onEdit={handleEditClick}
          selectedItems={selectedItems}
          onToggleSelect={handleToggleSelect}
          onDeleteSelected={onDeleteSelected} // Pass onDeleteSelected as a prop
        />
        )}
    </div>
  );
};

export default Product;
