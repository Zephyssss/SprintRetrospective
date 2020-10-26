const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

//config with .env
dotenv.config();

//connect to Database
mongoose.connect(process.env.CONNECT_DB, { useNewUrlParser: true }, () => {
  console.log("Connect to DB");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running in port: " + process.env.PORT);
});
