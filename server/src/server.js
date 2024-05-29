const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV == 'development'){
    dotenv.config({path: '.env.development'});
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}))

try{
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DATABASE_NAME
    })

    console.log("Mongo DB connected successfully");
}
catch(error){
    console.log("error");
}

app.use(routes)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})