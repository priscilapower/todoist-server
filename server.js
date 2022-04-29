require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_HOST, {
            useNewUrlParser: true
        });

        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();

console.log('depois conexao');
require('./app/routes/routes.js')(app);
console.log('depois routes');
app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

console.log('depois da rota raiz');

let PORT = process.env.PORT || 8088;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
