import React, { useState, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';

const ProductTable = ({ onEdit, selectedItems, onToggleSelect, onDeleteSelected }) => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('sno');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = () => {
    onDeleteSelected(selectedItems);
  };


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9092/api/get-products');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  return (
    <div>
      <button onClick={handleDeleteClick} className="del-btn">
        <AiIcons.AiFillDelete />
      </button>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th onClick={() => handleSort('category')}>Category</th>
            <th onClick={() => handleSort('subcategory')}>Subcategory</th>
            <th onClick={() => handleSort('quantity')}>Quantity</th>
            <th onClick={() => handleSort('price')}>Price</th>
            <th onClick={() => handleSort('offerprice')}>Offer Price</th>
            <th onClick={() => handleSort('startdate')}>Start Date</th>
            <th onClick={() => handleSort('enddate')}>End Date</th>
            <th onClick={() => handleSort('image')}>Image</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onToggleSelect(item.id)}
                />
              </td>
              <td>{item.category}</td>
              <td>{item.subcategory}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.offerprice}</td>
              <td>{item.startdate}</td>
              <td>{item.enddate}</td>
              <td>
                <img src={item.image} alt={item.category} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>
  <button
    className="btn-add"
    style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', marginRight: '5px' }}
    onClick={() => onEdit(item)} // Pass the entire item data to onEdit
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

export default ProductTable; 
