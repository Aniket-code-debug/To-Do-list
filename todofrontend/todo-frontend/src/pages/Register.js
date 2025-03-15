
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
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


  const handleRegister = async () => {
    setError("");
    if (!username || !email || !password) {
      setError("❌ Please fill in all fields.");
      return;
    }
    try {
      await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
      alert("✅ Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "❌ Registration failed");
    }
  };

  return (
    <div>
      { }
      <div className="top-buttons">
        <button className="toggle-btn" onClick={toggleDarkMode}>
          {document.body.classList.contains("dark") ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      { }
      <div className="auth-container">
        <div className="auth-box">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          {error && <p className="error">{error}</p>}
        </div>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}
