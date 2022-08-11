import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import AllHashes from './components/pages/AllHashes';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      <Route exact path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/certifications' element={<AllHashes/>} />
      </Routes>   
    </Router>
    </>
  );
}

export default App;
