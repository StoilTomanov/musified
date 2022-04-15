const express = require('express');
const mongoose = require('mongoose');

const apiCotnroller = require('./controllers/api');
const usersCotnroller = require('./controllers/users');
const msgCotnroller = require('./controllers/messages');

const cors = require('./middlewares/cors');
const serverInfo = require('./serverInfo');
const auth = require('./middlewares/auth');

initRest();

async function initRest() {
    const app = express();
    const port = 4000;
    const connectionString = 'mongodb://localhost:27017/musified'
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed');
        process.exit(1);
    }

    app.use(express.json());
    app.use(cors());
    app.use(auth())
    app.use('/api/records', apiCotnroller);
    app.use('/users', usersCotnroller)
    app.use('/message', msgCotnroller);

    app.get('/', (req, res) => res.json(serverInfo));

    app.listen(port, () => console.log(`Rest server is running on ${port}`))
}