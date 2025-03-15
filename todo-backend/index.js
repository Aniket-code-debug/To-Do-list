const cors = require("cors");
const express = require("express");
const connectDB = require("./config/dbConfig");
require("dotenv").config();

const app = express();


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


connectDB();


const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes"); 

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on http://192.168.29.150:${PORT}`));
