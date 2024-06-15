const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const port = 7000

const app = express();
app.use(cors(
    {
    origin: process.env.FRONTEND_URL,
    credentials: true
    }
));
app.use(cookieParser());

app.use(express.json({limit: "10mb"}));

app.use('/api', router);


connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}!`)
    })
})

