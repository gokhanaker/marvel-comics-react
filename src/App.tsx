import { Component } from 'react';
import './App.css';
import GetCharacter from './components/GetCharacter/GetCharacter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GetCharacter></GetCharacter>
      </div>
    );
  }
}

export default App;
