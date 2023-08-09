import React from "react";
import "../index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Autorization from "../components/Autorization";
import Disk from "./Disk";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/autorization" element={<Autorization />} />
        <Route path="/disk" element={<Disk />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;