import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Project/Pages/Home';
import Login from './Project/Login';
import Sidebar from './Project/Components/Sidebar';
import Customer from './Project/Pages/Customer';
import Products from './Project/Pages/Products';
import Layout from './Project/Pages/Layout';
import Themeeditor from './Project/Pages/Themeedditor';
import Orders from './Project/Pages/Orders';
import Returns from './Project/Pages/Returns';
import Customergroup from './Project/Pages/CustomerGroup';
import Catagories from './Project/Pages/Catagories';  
import Form from './Project/Frontend/Registrationform';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form/>}/>
        <Route path="/admin" element={<Login/>} />
        <Route path='/admin/home' element={<Sidebar/>}>
        <Route exact path="/admin/home" element={<Home/>}/>
        <Route path='/admin/home/catalog/categories' element={<Catagories/>}/>
        <Route path='/admin/home/catalog/products' element={<Products/>}/>
          <Route path='/admin/home/design/layout' element={<Layout/>}/>
          <Route path='/admin/home/design/themeeditor' element={<Themeeditor/>}/>
          <Route path='/admin/home/sales/returns' element={<Returns/>}/>
          <Route path='/admin/home/sales/orders' element={<Orders/>}/>
          <Route path='/admin/home/customer/customer' element={<Customer/>}/>
          <Route path='/admin/home/customer/customergroup' element={<Customergroup/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;