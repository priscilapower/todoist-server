require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors);

require('./app/routes/routes.js')(app);

app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

let PORT = process.env.PORT || 8088;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
