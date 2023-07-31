import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Products from "./components/Products";

class App extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <Products />
      </>
    );
  }
}

export default App;
