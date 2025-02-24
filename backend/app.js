const dotenv = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const dbgr = require('debug')
const connectToDb = require('./db/db')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')

connectToDb();

const app = express();

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/' , (req , res)=>{
    res.send('Hey')
})

app.use('/users' , userRoutes)

module.exports = app;