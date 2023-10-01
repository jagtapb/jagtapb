import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './components/login';
import { Register } from './components/register';
import { Home } from './components/home';
import { Nav } from './components/nav';

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
