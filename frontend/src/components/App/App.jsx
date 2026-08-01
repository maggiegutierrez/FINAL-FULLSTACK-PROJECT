import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

import Login from "../Main/Login/Login";
import Register from "../Main/Register/Register";
import Main from "../Main/Main";
import JobsSaved from "../Main/Jobs-saved/Jobs-saved";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import * as auth from "../../utils/auth";
import { TOKEN_KEY } from "../../utils/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");

  const handleLogin = () => {};

  const handleRegister = () => {};

  const handleLogout = () => {
    return auth
      .logout()
      .then(() => {
        setToken("");
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch(console.error);
  };

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<Main />} />
          <Route path="/saved" element={<JobsSaved />} />
        </Route>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register handleRegister={handleRegister} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
