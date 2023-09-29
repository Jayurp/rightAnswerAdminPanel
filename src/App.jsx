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

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route exact path="" element={<Landing/>}/>
    <Route exact path="addItem" element={<AddItem/>}/>
    <Route exact path="tableOrder" element={<TableOrder/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
