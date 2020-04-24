const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const hostname = "localhost";
const port = 3000;
const url = "mongodb://localhost:27017/nodepro";
const dbname = "nodepro";
const dboper = require('./operations');

const connect = mongoose.connect(url,{useNewUrlParser: true ,  useUnifiedTopology: true });

connect.then((db) => {

    console.log('Connected correctly to server');
},(err)=>{
    console.log(err);
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());



app.use('/dishes',dishRouter);
app.use('/leader',leaderRouter);
app.use('/promo',promoRouter);
app.use(express.static(__dirname+ '/public'));

app.use((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`);
});

