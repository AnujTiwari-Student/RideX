const mongoose = require('mongoose')
const dbgr = require('debug')("development:mongoose")

async function connectToDb(){
    if (!process.env.DB_CONNECT) {
        dbgr("Error: DB_CONNECT environment variable is not set.");
        process.exit(1); 
    }
    try{
        await mongoose.connect(process.env.DB_CONNECT)

        dbgr("Connected to Database Successfully")

        mongoose.connection.on('error', (err) => {
            dbgr(`Database connection error: ${err.message}`);
        });

        mongoose.connection.on('disconnected', () => {
            dbgr("Database disconnected");
            process.exit(1)
        });
    }
    catch(error){
        dbgr(error.message)
    }
} 

module.exports = connectToDb