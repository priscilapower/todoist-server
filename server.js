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

await mongoose.connect(process.env.DATABASE_HOST, {
    useNewUrlParser: true
}, (error) => console.log(error));
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
