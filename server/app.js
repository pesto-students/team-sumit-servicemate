const express = require('express');
const env = require('dotenv');
const app = express();
const config = require("./config")

if (process.env.NODE_ENV !== 'production') {
    env.config()
}

const PORT = config.port || 5000;
app.listen(PORT , console.log(`server started on ${PORT}`));