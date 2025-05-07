let ioInstance;

function init(server) {
  const { Server } = require("socket.io");
  ioInstance = new Server(server, {
    cors: {
      origin: "https://corp-comment-beta.vercel.app",
      methods: ["GET", "POST", "PATCH"],
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
