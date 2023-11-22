import React, { useState } from "react";
import * as AiIcons from 'react-icons/ai'

const Producttable = ({ data, onEdit, selectedItems, onToggleSelect, onDeleteSelected }) => {
  const [sortBy, setSortBy] = useState("sno");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (column) => {
    if (column === sortBy){
      setSortOrder( sortOrder === 'asc' ? 'desc' : 'asc');      
    }
    else{
      setSortBy(column);
      setSortOrder('desc');
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "sno") {
      return sortOrder === "desc" ? b.id - a.id : a.id - b.id;
    } else if (sortBy === "name") {
      return sortOrder === "desc" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return sortOrder === "desc" ? b.price - a.price : a.price - b.price;
    } else if (sortBy === "offerprice") {
      return sortOrder === "desc" ? b.offerprice - a.offerprice : a.offerprice - b.offerprice;
    } else if (sortBy === "quantity") {
      return sortOrder === "desc" ? b.quantity - a.quantity : a.quantity - b.quantity;
    } else if (sortBy === "image") {
      return sortOrder === "desc" ? b.image.localeCompare(a.image) : a.image.localeCompare(b.image);
    } else {
      // Handle other cases if needed
      return 0;
    }
  });

  return (
    <div>
      <button onClick={() => onDeleteSelected(selectedItems)} className="del-btn"> <AiIcons.AiFillDelete/> </button>
      <table className="table">
      <thead>
        <tr>
          <th>Select</th>
          <th onClick={()=>handleSort('sno')}>S.No</th>
          <th onClick={()=>handleSort('name')}>Name</th>
          <th onClick={()=>handleSort('price')}>Price</th>
          <th onClick={()=>handleSort('offerprice')}>Offer Price</th>
          <th onClick={()=>handleSort('quantity')}>Quantity</th>
          <th onClick={()=>handleSort('image')}>Image</th>
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
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.offerprice}</td>
            <td>{item.quantity} </td>
            <td>{item.image}</td>
            <td>
              <button
                className='btn-add'
                style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', marginRight: '5px' }}
                onClick={() => onEdit(item.id)}
              >
                <AiIcons.AiFillEdit/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Producttable;
