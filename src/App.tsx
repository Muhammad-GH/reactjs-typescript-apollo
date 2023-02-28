import React from 'react'
import Companies from './Components/Companies';
import Stations from './Components/Stations';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {

  return (
    <div className="app">
      <Companies />
      <br/>
      <br/>
      <br/>
      <br/>
      <Stations />
    </div>
  );
}

export default App;
