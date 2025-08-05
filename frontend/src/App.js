import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminLayout from "./components/AdminLayout ";

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
    <div className="app">
      {isLoggedIn ? (
        <AdminLayout onLogout={handleLogout} />
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
        </>
      )}
    </div>
  );
};

export default App;
