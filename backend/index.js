const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/routes');
require('dotenv').config()

const app = express();
app.use(cors());
app.use('/api', router);

const port = 7000;

connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}!`)
    })
})
