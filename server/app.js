const express = require('express');
const env = require('dotenv');
const app = express();
const config = require("./config");
const {PageNotFound,intrnlservrEror, BadReq} = require('./middleware/errors');

if (process.env.NODE_ENV !== 'production') {
    env.config()
}

app.get('/',(req,res)=>{
    res.send(req.httpVersion)
});

app.all(BadReq);
app.all("*",PageNotFound)
app.use((err,req,res,next)=>{
    err.statusCode =err.statusCode ||500;
    err.status = err.status || "error found" 
res.status(err.statusCode).json({
    staus:err.statusCode,
    message: err.message,
})
})

const PORT = process.env.PORT|| 5000;
app.listen(PORT , console.log(`server started on ${PORT}`));