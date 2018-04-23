const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const path = require('path');
const fs = require('fs');
const root = __dirname;
const routes = require('router');
const  http = require('http');
const config = require('./config');


//app.config
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use('/components', express.static(__dirname + '/components'));
    app.use('/js', express.static(__dirname + '/js'));
    app.use('/icons', express.static(__dirname + '/icons'));
    app.set('superSecret', config.secret); // secret variable
    app.use(express.static(path.join(__dirname, 'public')));
    // use body parser so we can get info from POST and/or URL parameters
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
//end config

mongoose.connect(config.database); // connect to database
// use morgan to log requests to the console


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " +
        app.get('port'));
});

require('./routes/sockets').initialize(server);









//dang ky nguoi dung moi
const uploadfile = require('./routes/uploadfile');
app.use('/upload.html', uploadfile);

//dang ky nguoi dung moi
const setup = require('./routes/setup');
app.use('/', setup);

app.get('/index.html',(rep,res)=>res.render('index'));




