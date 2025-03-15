import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoApp from "./pages/ToDoApp";

function PrivateRoute({ children }) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    console.error("❌ AuthContext is undefined!");
    return <Navigate to="/login" />;
  }
  const { token } = authContext;
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>  {}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/todos" element={<PrivateRoute><TodoApp /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
