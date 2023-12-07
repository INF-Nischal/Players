const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/userRoutes');

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({limit:'5mb', extended: true }));

app.use('/players', router);

const port = process.env.PORT;

async function startServer() {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();