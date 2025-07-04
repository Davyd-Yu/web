const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5050;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Wordllban application." });
})

// Connect routes for complexes
const complexRoutes = require("./src/routes/item.routes"); // If you renamed it, then complex.routes

// Add the following line to connect the routes
app.use('/api/complexs', complexRoutes); // Use the '/api/complexs' prefix for all CRUD routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`); // Changed to PORT instead of port
});
