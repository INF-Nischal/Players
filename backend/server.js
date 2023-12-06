const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const router = require('./routes/userRoutes');

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.use('/players/', router);

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