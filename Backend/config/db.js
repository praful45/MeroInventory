const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inventory";

const connectToMongo = async ()=> {
    mongoose
    .connect(mongoURI)
    .then(console.log("Connected Successfully"))
    .catch((err)=> {console.log(err)})
}

module.exports = connectToMongo;