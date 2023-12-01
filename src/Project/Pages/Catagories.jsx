//Catagories
import React, { useState, useEffect } from 'react';
import * as TiIcons from 'react-icons/ti';
import * as GiIcons from 'react-icons/gi';
import './Catagories/Catagories.css';
import CategoriesTable from './Catagories/CatagoriesTable';
import CategoriesForm from './Catagories/CatagoriesForm';

const Catagories = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();// eslint-disable-next-line
  }, [page, limit]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:9091/fetch?page=${page}&limit=${limit}`);
      if (response.ok) {
        const { data: fetchedData, totalPages: fetchedTotalPages } = await response.json();
        setData([...fetchedData]); // Ensure you spread the array to create a new reference
        setTotalPages(fetchedTotalPages);
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      let url = 'http://localhost:9091/save';

      if (editMode) {
        url = `http://localhost:9091/edit/${categoryToEdit._id}`;
      }

      const response = await fetch(url, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchData();
        setCategoryToEdit(null);
        setEditMode(false);
        setShowForm(true);
      } else {
        console.error('Failed to save data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditClick = (categoryId) => {
    const categoryToEdit = data.find((item) => item._id === categoryId);
    if (categoryToEdit) {
      setCategoryToEdit(categoryToEdit);
      setEditMode(true);
      setShowForm(true);
    }
  };

  const handleToggleSelect = (itemId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };

  const onDeleteSelected = async () => {
    try {
      const response = await fetch('http://localhost:9091/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedItems }),
      });

      if (response.ok) {
        await fetchData();
        setSelectedItems([]);
      } else {
        console.error('Failed to delete data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onSelectAll = (itemIds) => {
    setSelectedItems(itemIds);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className='container'>
      <h1 className="head">
        Categories
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className='adding'>
            <TiIcons.TiPlus />
          </button>
        ) : (
          <button onClick={() => setShowForm(false)} className='adding'>
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
        <>
          <CategoriesTable
            data={data}
            onEdit={handleEditClick}
            selectedItems={selectedItems}
            onToggleSelect={handleToggleSelect}
            onDeleteSelected={onDeleteSelected}
            onSelectAll={onSelectAll}
            page={page}
            limit={limit}
          />
          <div className="pagination">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            <GiIcons.GiPreviousButton/>
              </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages || totalPages === 0}>
            <GiIcons.GiNextButton/>
              </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Catagories;
