import React, { Component } from 'react';
import Navbar from './components/Navbar';



class App extends Component {
  render(){
    return(
      <div>
        <Navbar/>
        I am rendering my app
      </div>
    );
  }
}

export default App