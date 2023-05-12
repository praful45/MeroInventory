const connectToMongo = require('./config/db');
const express = require('express')
// const cors = require('cors')

connectToMongo();


const app = express()
const port = 5000

// app.use(cors())
app.use(express.json())

//Available Routes
const productRoutes = require('./routes/productsRoute');
app.use('/api',productRoutes)

app.listen(port, () => {
  console.log(`Backend at http://localhost:${port}`)
})