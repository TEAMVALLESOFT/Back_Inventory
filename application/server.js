const express = require('express');
const app = express();


// settings
app.set('port',process.env.PORT || 3000);


app.get('/index', function(req, res) {
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});

// start sever
app.listen(app.get('port'), (error)=> {

    if(!error){
    console.log(`Server on port http://localhost:${app.get('port')}`);
    }else{
        console.log(error);
    }
});

module.exports= app;