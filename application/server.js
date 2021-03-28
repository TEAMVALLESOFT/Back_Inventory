const express = require ('express');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const app = express();
require('./Config/db');

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
