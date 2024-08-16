import React from 'react';
import AvgCalculator from './AvgCalculator';
import MyComponent from './MyComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Application</h1>
        <AvgCalculator />
        <MyComponent />
      </header>
    </div>
  );
}

export default App;
