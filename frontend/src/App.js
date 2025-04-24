import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import Main from './Component.jsx/Main';
import Rigester from './Component.jsx/Rigester';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/reg' element={<Rigester/>}/>

    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;