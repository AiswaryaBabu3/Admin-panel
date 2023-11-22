// Customer.js

import React, { useState, useEffect, useCallback } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';


import './Customer.css';

const Customer = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const registrationsPerPage = 5;

  const fetchRegistrations = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/user-registrations?page=${currentPage}&perPage=${registrationsPerPage}`);
      const data = await response.json();

      if (data.registrations && data.registrations.length > 0) {
        setRegistrations(data.registrations);
      }

      if (data.totalRegistrations) {
        setTotalRegistrations(data.totalRegistrations);
      }
    } catch (error) {
      console.error('Error fetching user registrations:', error);
    }
  }, [currentPage, registrationsPerPage]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations, currentPage]);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    
    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(`http://localhost:9090/api/user-registrations/${userId}`, {
        method: 'DELETE',
      });

      fetchRegistrations();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Check the console for details.');
    }
  };

  const handleCheckboxChange = (userId) => {
    const updatedSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];

    setSelectedUsers(updatedSelectedUsers);
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedUsers(selectAll ? [] : registrations.map((user) => user._id));
  };

  const handleDeleteSelected = () => {
    selectedUsers.forEach((userId) => handleDelete(userId));
    setSelectedUsers([]);
    fetchRegistrations();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalRegistrations / registrationsPerPage);

  return (
    <div className='customer'>
      <h1 className='customer-head'>CUSTOMER</h1>
      <div>
        <button
          className='btn del'
          style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', marginRight: '5px' }}
          onClick={handleDeleteSelected}
        >
          <AiIcons.AiFillDelete />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
                style={{cursor:'pointer'}}
              />
            </th>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No</th>
            <th>City</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((user, index) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
                  style={{cursor:'pointer'}}
                />
              </td>
              <td>{index + 1 + (currentPage - 1) * registrationsPerPage}</td>
              <td>{user.Fullname}</td>
              <td>{user.EmailID}</td>
              <td>{user.ContactNumber}</td>
              <td>{user.City}</td>
              <td>{user.Password ? user.Password.replace(/./g, '*') : ''}</td>
              <td>
                <button
                  className='btn'
                  style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', marginRight: '5px' }}
                  onClick={() => handleDelete(user._id)}
                >
                  <AiIcons.AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination"> 
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <GiIcons.GiPreviousButton/>
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
          <GiIcons.GiNextButton/>
        </button>
      </div>
    </div>
  );
};

export default Customer;
