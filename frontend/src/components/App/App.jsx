import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { SavedJobsProvider } from "../../context/SavedJobsContext";
import "./App.css";

import Login from "../Main/Login/Login";
import Register from "../Main/Register/Register";
import Main from "../Main/Main";
import JobsSaved from "../Main/JobsSaved/JobsSaved";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import * as auth from "../../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    auth
      .getCurrentUser()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsCheckingSession(false));
  }, []);

  const handleLogin = ({ email, password }) => {
    return auth
      .login(email, password)
      .then(() => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, email, password }) => {
    return auth
      .register(name, email, password)
      .then(() => navigate("/login"))
      .catch(console.error);
  };

  const handleLogout = () => {
    return auth
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch(console.error);
  };

  return (
    <SavedJobsProvider isLoggedIn={isLoggedIn}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isCheckingSession={isCheckingSession}
              />
            }
          >
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
    </SavedJobsProvider>
  );
}

export default App;
