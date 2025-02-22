const dotenv = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const dbgr = require('debug')

const app = express();

app.use(cors())

app.get('/' , (req , res)=>{
    res.send('Hey')
})

module.exports = app;