require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const createError = require('http-errors')
const categoryRoute = require('./routes/categoryRoute')
const productsRoute = require('./routes/productsRoute')
const warehouseRoute = require('./routes/warehouseRoute')
const authRoute = require('./routes/authRoute');
const { verifyAccessToken } = require("./middleware/authHelpers/jwtHelper");

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

//auth
app.use('/api', authRoute)

app.use('/api', productsRoute)

//Routes
app.get("/", verifyAccessToken, async (req, res, next) => {
    res.send("Home Page");
});

//categories
app.use('/api', verifyAccessToken, categoryRoute)

//products

// warehouse
app.use('/api', verifyAccessToken, warehouseRoute)


//not found
app.use(async (req, res, next) => {
    // const error = new Error("Not Found")
    // error.status = 404
    // next(error)
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})




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