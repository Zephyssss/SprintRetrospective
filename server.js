const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

//config with .env
dotenv.config();

//connect to Database
mongoose.connect(process.env.CONNECT_DB, { useNewUrlParser: true }, () => {
  console.log("Connect to DB");
});

const server = app.listen(process.env.PORT, () => {
  console.log("Server is running in port: " + process.env.PORT);
});

//Socket io for Express
//https://stackoverflow.com/questions/35713682/socket-io-gives-cors-error-even-if-i-allowed-cors-it-on-server/35753596
const options = {
  cors: true,
  origins: ["http://127.0.0.1:3000","https://sprint-lilac.vercel.app"],
};
const io = require("socket.io")(server, options);

console.log(io);

io.on("connection", function (socket) {
  socket.on("changeboard", function (msg) {
    console.log("message: " + msg.data);
    io.emit("changeboardhandle", { data: 'changeboardhandle' });
  });
});
