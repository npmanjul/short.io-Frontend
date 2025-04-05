import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Redirect from "./pages/Redirect";
import Url from "./pages/Url";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import TimeOut from "./pages/TimeOut.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect/:id" element={<Redirect />} />
        <Route path="/url" element={<Url />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timeout" element={<TimeOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
