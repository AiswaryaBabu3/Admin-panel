//CategoriesTable.js
import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';

const CategoriesTable = ({
  data,
  onEdit,
  selectedItems,
  onToggleSelect,
  onDeleteSelected,
  onSelectAll,
  page,
  limit,
}) => {
  const [sortBy, setSortBy] = useState('sno');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleSelectAll = () => {
    const allItemIds = data.map((item) => item._id);

    // If all items are currently selected, deselect all; otherwise, select all
    const newSelectedItems =
      selectedItems.length === allItemIds.length ? [] : allItemIds;

    onSelectAll(newSelectedItems);
  };

  const handleDeleteSelected = () => {
    onDeleteSelected(selectedItems);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'sno') {
      return sortOrder === 'desc' ? b.id - a.id : a.id - b.id;
    } else if (sortBy === 'Catagory') {
      return sortOrder === 'asc'
        ? a.Catagory.localeCompare(b.Catagory)
        : b.Catagory.localeCompare(a.Catagory);
    } else if (sortBy === 'SubCatagory') {
      return sortOrder === 'asc'
        ? a.SubCatagory.localeCompare(b.SubCatagory)
        : b.SubCatagory.localeCompare(a.SubCatagory);
    } else if (sortBy === 'Description') {
      return sortOrder === 'asc'
        ? a.Description.localeCompare(b.Description)
        : b.Description.localeCompare(a.Description);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <button onClick={handleDeleteSelected} className="del-btn">
        <AiIcons.AiFillDelete />
      </button>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedItems.length === data.length}
                style={{cursor:'pointer'}}
              />
            </th>
            <th>S.No</th>
            <th onClick={() => handleSort('Catagory')}>Category</th>
            <th onClick={() => handleSort('SubCatagory')}>Subcategory</th>
            <th onClick={() => handleSort('Description')}>Description</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => onToggleSelect(item._id)}
                  style={{cursor:'pointer'}}
                />
              </td>
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{item.Catagory}</td>
              <td>{item.SubCatagory}</td>
              <td>{item.Description}</td>
              <td>
                <button
                  className="btn"
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '5px 10px',
                    marginRight: '5px',
                  }}
                  onClick={() => onEdit(item._id)}
                >
                  <AiIcons.AiFillEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
