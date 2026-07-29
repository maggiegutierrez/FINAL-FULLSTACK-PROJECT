import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "../Main/Login/Login";
import Register from "../Main/Register/Register";
import Main from "../Main/Main";
import JobsSaved from "../Main/Jobs-saved/Jobs-saved";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saved" element={<JobsSaved />} />
      </Routes>
    </div>
  );
}

export default App;
