const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const categoryRoute = require('./routes/categoryRoute')
const productsRoute = require('./routes/productsRoute')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

//categories
app.use('/api', categoryRoute)

//products
app.use('/api', productsRoute)




//Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`)
        })
    })
    .catch((err) => console.log())