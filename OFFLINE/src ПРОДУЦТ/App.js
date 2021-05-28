import React from 'react';
import { Router } from '@reach/router'
import Main from './views/Main'
import Update from './views/Update'
import Detail from './views/Detail'
import './App.css';



function App() {
  return (
    <div className="App">
      <Router>
        <Main path = "/"/>
        <Detail path = "/:id"/>
        <Update path ="/:id/edit"/>
      </Router>
    </div>
  )
}

export default App;
