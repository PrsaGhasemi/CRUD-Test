const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
//---------------------------
const {errorHandler} = require('./src/Middlewares/errorHandler');
const {connectDB} = require('./src/Config/db');
//* Express
const app = express()
//* Config
dotenv.config({path: "./src/Config/config.env"})
//* Body-Parser
app.use(bodyParser.urlencoded({extended: true}))
//* Error-Handler
//! app.use(errorHandler())
//* ConnectDB
connectDB()

const PORT = process.env.PORT
app.listen(PORT , () => {
    console.log(`Server is Connected to port ${PORT}`);
})
