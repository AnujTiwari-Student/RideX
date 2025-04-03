const http = require('http')
const app = require('./app')
const {initializeSocket} = require('./socket')

const dbgr = require('debug')('development: app')

const server = http.createServer(app);
initializeSocket(server);

server.listen(process.env.PORT , ()=>{
    dbgr(`Server is running on ${process.env.PORT}`)
})