import React, { useState, useEffect } from "react";
import "./App.css";
import LoginSignup from './components/LoginSignup.jsx'
import WeatherApp from './components/WeatherApp.jsx'
import {BrowserRouter , Routes ,Route} from 'react-router-dom';


function App(){
  
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup/>}></Route>
        <Route path="/WeatherApp" element={<WeatherApp/>}></Route>
      </Routes>
    </BrowserRouter>
   

  
  </div>

  );

}





export default App;