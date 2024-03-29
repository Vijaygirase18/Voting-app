import React from 'react';
import './App.css';
import LoginPage from './Login';
import Register from './Register';
import VotingPage from './Vote.jsx';
import AdminHomePage from './Admin.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Vote' element={<VotingPage/>}/>
        <Route path='/Admin' element={<AdminHomePage/>}/>



      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
