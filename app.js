const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require("dotenv").config();

const {dbConnection} = require('./config/db_connection');
const app = express();
const route = require('./routes/route.js')

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

dbConnection

app.use('/external/fcm/registration/', route);

app.listen(port, () => {
    console.log('server is started in port 3000');
});