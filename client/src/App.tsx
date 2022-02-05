import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import  RegisterContainer  from "./containers/RegisterContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
