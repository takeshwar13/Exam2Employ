import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        {isLoggedIn ? (
          <>
            {/* Routes for authenticated users */}
            <Routes>
              <Route
                path="/*"
                element={
                  user?.role === "admin" ? (
                    <AdminLayout onLogout={handleLogout} />
                  ) : (
                    <UserLayout onLogout={handleLogout} />
                  )
                }
              />
            </Routes>
          </>
        ) : (
          <>
            <Navbar
              onLoginClick={() => setShowLogin(true)}
              onSignUpClick={() => setShowSignUp(true)}
            />
            {showLogin && (
              <Login
                onRegisterClick={() => {
                  setShowLogin(false);
                  setShowSignUp(true);
                }}
                onLogin={handleLogin}
              />
            )}
            {showSignUp && (
              <SignUp
                onLoginClick={() => {
                  setShowSignUp(false);
                  setShowLogin(true);
                }}
              />
            )}

            {/* Public routes */}
            <Routes>
              <Route
                path="/"
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl font-bold">
                      Welcome to Exam2Employ
                    </h1>
                  </div>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
