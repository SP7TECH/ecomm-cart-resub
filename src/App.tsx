import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import { ThemeProvider } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import theme from "./theme";
import { ToastContainer } from "react-toastify";

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Navigation />
        <Products />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        ;
      </ThemeProvider>
    );
  }
}

export default App;
