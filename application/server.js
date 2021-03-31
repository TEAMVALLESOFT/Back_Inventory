const express = require ('express');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./Config/db');

const app = express();
    app.use(cors());


    app.use((req,res, next)=> {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
        next();
      })

// settings
app.set('port',process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use('/api', apiRouter);

// start sever
app.listen(app.get('port'), (error)=> {
    if(!error){
    console.log(`Server on port http://localhost:${app.get('port')}`);
    }else{
        console.log(error);
    }
});

module.exports= app;
