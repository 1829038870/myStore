import React from 'react';
import routerList from "./router/routerList"
import RouterView from "./router/routerView"
import {BrowserRouter} from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterView routerList={routerList}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
