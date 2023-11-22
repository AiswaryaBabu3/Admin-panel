import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";

const CategoriesTable = ({
  data,
  onEdit,
  selectedItems,
  onToggleSelect,
  onDeleteSelected,
  onSelectAll,
}) => {
  const [sortBy, setSortBy] = useState("sno");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "sno") {
      return sortOrder === "desc" ? b.id - a.id : a.id - b.id;
    } else if (sortBy === "category") {
      return sortOrder === "asc" ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
    } else if (sortBy === "subcategory") {
      return sortOrder === "asc" ? a.subcategory.localeCompare(b.subcategory) : b.subcategory.localeCompare(a.subcategory);
    } else if (sortBy === "description") {
      return sortOrder === "asc" ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
    } else {
      return 0;
    }
  });

  const handleSelectAll = () => {
    const allItemIds = data.map((item) => item.id);
    onSelectAll(allItemIds);
  };

  return (
    <div>
      <button onClick={() => onDeleteSelected(selectedItems)} className="del-btn">
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
              />
            </th>
            <th onClick={() => handleSort("sno")}>S.No</th>
            <th onClick={() => handleSort("category")}>Category</th>
            <th onClick={() => handleSort("subcategory")}>Subcategory</th>
            <th onClick={() => handleSort("description")}>Description</th>
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
              <td>{item.category}</td>
              <td>{item.subcategory}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className="btn"
                  style={{ backgroundColor: "green", color: "white", padding: "5px 10px", marginRight: "5px" }}
                  onClick={() => onEdit(item.id)}
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
