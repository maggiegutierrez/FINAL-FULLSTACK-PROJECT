import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "../Main/Login/Login";
import Register from "../Main/Register/Register";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<p>Home — pendiente Main.jsx</p>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
