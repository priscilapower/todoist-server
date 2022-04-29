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

app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

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





if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


console.log('depois conexao');
require('./app/routes/routes.js')(app);
console.log('depois routes');


console.log('depois da rota raiz');



let PORT = process.env.PORT || 8088;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
