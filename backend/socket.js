let ioInstance;

function init(server) {
  const { Server } = require("socket.io");
  ioInstance = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });
  console.log("IO Initialized");

  return ioInstance;
}

function getIO() {
  if (!ioInstance) {
    throw new Error("io not initialized");
  }
  return ioInstance;
}

module.exports = { init, getIO };
