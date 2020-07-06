import React from 'react';
import './App.css';
import Home from './components/home'
import {  BrowserRouter as Router } from 'react-router-dom';
class App extends React.Component{
render(){
  return(
    <Router>
        <Home/>
      </Router>
  )
}
}
export default App;
