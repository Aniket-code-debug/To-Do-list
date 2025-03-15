import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "../App.css";

const API_URL = "http://192.168.29.149:5000/api/todos";


export default function TodoApp() {
  const { token, logout } = useContext(AuthContext);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );


  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    fetchTodos();
  }, [darkMode]);


  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("❌ Error fetching todos:", error.message);
    }
  };


  const addTask = async () => {
    if (!task.trim()) return;
    try {
      const response = await axios.post(
        API_URL,
        { task, priority: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, response.data]);
      setTask("");
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };


  const toggleTask = async (id, completed) => {
    try {
      await axios.put(
        `${API_URL}/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t._id === id ? { ...t, completed: !completed } : t
        )
      );
    } catch (error) {
      console.error("❌ Error updating task:", error);
    }
  };


  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("❌ Error deleting task:", error);
    }
  };


  const enableEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };


  const updateTask = async (id) => {
    try {
      await axios.put(
        `${API_URL}/${id}`,
        { task: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t._id === id ? { ...t, task: editText } : t
        )
      );
      setEditId(null);
    } catch (error) {
      console.error("❌ Error updating task:", error);
    }
  };

  const togglePriority = async (id, priority) => {
    try {
      await axios.put(
        `${API_URL}/${id}`,
        { priority: !priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t._id === id ? { ...t, priority: !priority } : t
        )
      );
    } catch (error) {
      console.error("❌ Error updating priority:", error);
    }
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      { }
      <div className="top-right">
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
        <button className="logout-btn" onClick={logout}>🚪 Logout</button>
      </div>

      <h1>To-Do List</h1>

      { }
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      { }
      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t._id} className={t.completed ? "completed" : ""}>
            {editId === t._id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span onClick={() => toggleTask(t._id, t.completed)}>{t.task}</span>
            )}
            <div className="buttons">
              <button className={`priority-btn ${t.priority ? "high-priority" : ""}`} onClick={() => togglePriority(t._id, t.priority)}>⭐</button>
              {editId === t._id ? (
                <>
                  <button className="save-btn" onClick={() => updateTask(t._id)}>💾</button>
                  <button className="cancel-btn" onClick={() => setEditId(null)}>❌</button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => enableEdit(t._id, t.task)}>✏️</button>
              )}
              <button className="delete-btn" onClick={() => deleteTask(t._id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
