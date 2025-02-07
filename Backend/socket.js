const socketIO = require('socket.io');
const userModel=require('./models/user.model');
const captainModel=require('./models/captain.model');
let io;

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["*"]
    },
    transports: ['websocket', 'polling']
  });

  io.on('connection', (socket) => {
    const currentTime = new Date().toLocaleString()
    console.log('Client connected:', socket.id, 'at the',currentTime);

    socket.on('join', async (data) => {
      console.log('Join event received:', data);
      // join event call krege toh usme ek object bhejna hoga jiske andr userId hogi aur userTpe hoga
      // Add data validation
      if (!data || !data.userId || !data.userType) {
        console.error('Invalid join data:', data);
        return;
      }

      const { userId, userType } = data;

      try {
        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`User ${userId} socket updated`);
        } else if (userType === 'captain') {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`Captain ${userId} socket updated`);
        }
      } catch (error) {
        console.error('Error updating socket ID:', error);
      }
    });

    // this is for updating the location of captain using the socket
    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
          return socket.emit('error', { message: 'Invalid location data' });
      }

      await captainModel.findByIdAndUpdate(userId, {
          location: {
              ltd: location.ltd,
              lng: location.lng
          }
      });
  });
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}
// thius function will be used to send messages/ notifications to all the SocketIds basically captains ids
function sendMessageToSocketId( socketId, messageObject ) {
  if (!io) {
    console.error('Socket.io not initialized');
    return;
  }

  if (!socketId ) {
    console.error('Missing required parameters:', { socketId });
    return;
  }

  try {
    // mesage is object here with structure as{ event, data}
    io.to(socketId).emit(messageObject.event, messageObject.data);
    console.log(`Message sent to ${socketId} as ${messageObject}`);
  } catch (error) {
    console.error(`Failed to send message to socket ${socketId}:`, error);
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
  getIO: () => io
};