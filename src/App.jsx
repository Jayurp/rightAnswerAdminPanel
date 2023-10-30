import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { Route, Routes, useRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Landing from './landing'
import AddItem from './addItems'
import TableOrder from './TableOrder'
import Orderhistory from './Orderhistory';
import PrivateRoute from './PrivateRoute';
import {AuthProvider} from './Authcontext/Authcontext';
import Template from './components/template';


function App() {
  

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
    <Route exact path="/login" element={<Template/>}/>

    <Route path="/" element={
        <PrivateRoute>
          <Landing />
        </PrivateRoute>}/>
        <Route path="/addItem" element={
        <PrivateRoute>
          <AddItem />
        </PrivateRoute>}/>
        <Route path="/tableOrder" element={
        <PrivateRoute>
          <TableOrder />
        </PrivateRoute>}/>
        <Route path="/orderhistory" element={
        <PrivateRoute>
          <Orderhistory />
        </PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App
