import React, { Component } from 'react';
import GameField from './Components/GameFieldComponent/GameField';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameField />
      </div>
    );
  }
}

export default App;
