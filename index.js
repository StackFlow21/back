// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('uploads')); // Serve uploaded files

// Routes
app.use("/felhasznalok", require('./routes/userRoutes'));
app.use("/api", require('./routes/userRoutes'));

app.listen(8000, () => {
    console.log("Server running on port 8000");
});

app.get("/", (req, res) => {
    res.json({message: "StackOverflow Clone API"});
});