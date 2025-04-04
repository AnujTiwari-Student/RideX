const socketIo = require('socket.io');
const userModel = require('./models/user-model');
const captainModel = require('./models/captain-model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {

        socket.on('join', async (data) => {
            const { userId , userType } = data;

            console.log("User Type: ", userType)
            console.log("User Id: ", userId)

            if(userType === "user") {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
            }else if(userType === "captain") {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
            }
        });

        socket.on('captain-location' , async (data) => {
            const { location , userId , token } = data;

            if(!location || !userId || !token) return console.log("Invalid data")

            // console.log("Location: ", location?.lat , location?.lng)
            // console.log("User Id: ", userId)
            // console.log("Token: ", token)

            await captainModel.findByIdAndUpdate(userId, { location:{
                lat: location.lat,
                lng: location.lng
            } }, { new: true });

        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (io && socketId) {
        io.to(socketId).emit(message.event , message.data);
    } else {
        console.error('Socket not initialized or invalid socket ID:', socketId);
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
}