import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Project/Pages/Home';
import Login from './Project/Login';
import Sidebar from './Project/Components/Sidebar';
import Customer from './Project/Pages/Customer';
import Products from './Project/Pages/Products';
import Layout from './Project/Pages/Layout';
import Themeeditor from './Project/Pages/Themeeditor';
import Orders from './Project/Pages/Orders';
import Returns from './Project/Pages/Returns';
import Customergroup from './Project/Pages/CustomerGroup';
import Catagories from './Project/Pages/Catagories';
import Form from './Project/Frontend/Registrationform';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Implement your authentication logic here
    // For simplicity, let's assume authentication is successful
    setAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ element, redirectTo }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return element;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/admin" element={<Login />} />
            <Route
              path="/admin/home"
              element={<Sidebar />}
            >
              <Route
                index
                element={<PrivateRoute element={<Home />} redirectTo="/admin" />}
              />
              <Route
                path="catalog/categories"
                element={<PrivateRoute element={<Catagories />} redirectTo="/admin" />}
              />
              <Route
                path="catalog/products"
                element={<PrivateRoute element={<Products />} redirectTo="/admin" />}
              />
              <Route
                path="design/layout"
                element={<PrivateRoute element={<Layout />} redirectTo="/admin" />}
              />
              <Route
                path="design/themeeditor"
                element={<PrivateRoute element={<Themeeditor />} redirectTo="/admin" />}
              />
              <Route
                path="sales/returns"
                element={<PrivateRoute element={<Returns />} redirectTo="/admin" />}
              />
              <Route
                path="sales/orders"
                element={<PrivateRoute element={<Orders />} redirectTo="/admin" />}
              />
              <Route
                path="customer/customer"
                element={<PrivateRoute element={<Customer />} redirectTo="/admin" />}
              />
              <Route
                path="customer/customergroup"
                element={<PrivateRoute element={<Customergroup />} redirectTo="/admin" />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
