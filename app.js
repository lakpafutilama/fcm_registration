const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./controller/db_connection');
const app = express();
const route = require('./routes/route.js')

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(3000, () => {
    console.log('server is started in port 3000');
});

app.use('/external/fcm/registration/', route);
