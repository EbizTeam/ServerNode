const express = require('express');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');


const port = process.env.PORT || 3000;
//init app
const app = express();

//ejs
app.set('view engine','ejs');



//public
app.use(express.static('./public'));


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


var config = require('./config');
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.listen(port, () => console.log(`Server started on port ${port}`));


//dang ky nguoi dung moi
const uploadfile = require('./routes/uploadfile');
app.use('/upload.html', uploadfile);

//dang ky nguoi dung moi
const setup = require('./routes/setup');
app.use('/', setup);

app.get('/index.html',(rep,res)=>res.render('index'));




