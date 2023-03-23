const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./config/db_connection");
const app = express();
const route = require("./routes/route.js");

require("dotenv").config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

dbConnection;

app.use("/external/fcm/registration/", route);

app.listen(port, () => {
  console.log(`server is started in port ${port}`);
});
