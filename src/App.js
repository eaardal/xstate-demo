import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import Light from "./Light";
// import Planets from "./Planets";
import Characters from "./Character/CharactersContainer";
import CharactersContainer from "./Character/CharactersContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <Light /> */}
        {/* <Planets /> */}
        <CharactersContainer />
      </div>
    );
  }
}

export default App;
