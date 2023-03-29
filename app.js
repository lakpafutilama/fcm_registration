const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./config/db_connection");
const app = express();
const route = require("./routes/route.js");
const { checkOwnership } = require("./middleware/checkOwnership");

require("dotenv").config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

dbConnection;

app.use("/external/fcm/registration/:ownership", checkOwnership, route);

app.listen(port, () => {
  console.log(`server is started in port ${port}`);
});
