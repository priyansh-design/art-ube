import React from 'react'
import Cards from './components/Cards';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Hero/>}></Route>
        <Route path='/marketplace' element={<Marketplace/>}></Route>
        <Route path='/verify' element={<Cards/>}></Route>
      </Routes>
   
      </BrowserRouter>
      
    </div>
  );
}

export default App;
