import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import AdminLayout from "./components/admin/AdminLayout";
import UserLayout from "./components/user/UserLayout";
import LandingPage from "./components/common/LandingPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLogin(false);
    setShowSignUp(false); // Ensure signup is also hidden
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleNavbarLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false); // Explicitly hide signup
  };

  const handleNavbarSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false); // Explicitly hide login
  };

  const handleBrandClick = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  return (
    <Router>
      <div className="app">
        {isLoggedIn ? ( // No changes needed. AdminLayout already handles /manage-users route for admins.
          <>
            <Routes>
              <Route
                path="/*"
                element={
                  user?.role === "ADMIN" ? (
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
              onLoginClick={handleNavbarLoginClick}
              onSignUpClick={handleNavbarSignUpClick}
              activeForm={showLogin ? "login" : showSignUp ? "signup" : null}
              onBrandClick={handleBrandClick}
            />

            {/* Login/Signup forms */}
            {showLogin && (
              <Login
                onRegisterClick={() => {
                  setShowLogin(false);
                  setShowSignUp(true);
                }}
                onLogin={handleLogin}
                onClose={() => setShowLogin(false)}
              />
            )}
            {showSignUp && (
              <SignUp
                onLoginClick={() => {
                  setShowSignUp(false);
                  setShowLogin(true);
                }}
                onClose={() => setShowSignUp(false)}
                onSignUpSuccess={handleLogin} // Assuming similar handling as login
              />
            )}

            {/* Public routes */}
            {!showLogin && !showSignUp && (
              <Routes>
                <Route
                  path="/"
                  element={
                    <LandingPage
                      onLoginClick={handleNavbarLoginClick}
                      onSignUpClick={handleNavbarSignUpClick}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            )}
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
