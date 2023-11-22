import React, { useState } from 'react';
import * as TiIcons from 'react-icons/ti';
import './Catagories/Catagories.css';
import CategoriesTable from './Catagories/CatagoriesTable';
import CategoriesForm from './Catagories/CatagoriesForm';



const Catagories = () => {
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

  const onSelectAll = (itemIds) => {
    // Handle selecting or deselecting all items based on itemIds
    setSelectedItems(itemIds);
  };

  return (
    <div className='container'>
      <h1 className="head">
        Catagories
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
        <CategoriesForm
          onFormSubmit={handleFormSubmit}
          initialFormData={categoryToEdit}
          editMode={editMode}
        />
        ) : (
          <CategoriesTable
          data={data}
          onEdit={handleEditClick}
          selectedItems={selectedItems}
          onToggleSelect={handleToggleSelect}
          onDeleteSelected={onDeleteSelected}
          onSelectAll={onSelectAll} // Pass onSelectAll as a prop
        />
        )}
    </div>
  );
};

export default Catagories;
