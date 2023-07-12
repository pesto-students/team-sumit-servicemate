const express = require('express');
const env = require('dotenv');

const { PageNotFound, BadReq, ReqError } = require('./middleware/errors');
const dbConnect = require('./config/dbConnect');
const errorHandler = require('./middleware/errorHandler');
const vendorRouter = require('./Routes/vendorRouter');
const userRouter = require('./Routes/userRouter')
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())

env.config();
//dataBase connection
dbConnect();

// if (process.env.NODE_ENV !== 'production') {
//     env.config()
// }

app.get('/', (req, res) => {
    res.send(req.httpVersion)
});

//error and errorHandler section


app.use('/api/vendor', vendorRouter);
app.use('/api/User', userRouter);

app.all(ReqError);
app.all(BadReq);

app.all("*", PageNotFound)
app.use(errorHandler)
app.all("*", PageNotFound)
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error found"
    res.status(err.statusCode).json({
        staus: err.statusCode,
        message: err.message,
    })
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on ${PORT}`));
