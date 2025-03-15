import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://192.168.29.150:5000"; 

  
  useEffect(() => {
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark");
    }
  }, []);

  
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  };

  
  const handleLogin = async () => {
    setError(""); 
    if (!email || !password) {
      setError("❌ Please enter both email and password.");
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      setError("❌ Invalid Credentials. Please try again.");
    }
  };

  return (
    <div>
      {}
      <div className="top-buttons">
        <button className="toggle-btn" onClick={toggleDarkMode}>
          {document.body.classList.contains("dark") ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {}
      <div className="auth-container">
        <div className="auth-box">
          <h2>Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          {error && <p className="error">{error}</p>}
        </div>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}
