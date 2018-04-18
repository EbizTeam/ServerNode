const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const jwt    = require('jsonwebtoken');

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

app.listen(port, () => console.log(`Server started on port ${port}`));


app.get('/',(rep,res)=>res.render('index'));

//set storage engine
const storage = multer.diskStorage({
    description:'./public/uploadchat/',
    fileName:function (req, file, cb) {
        cb(null,file.fieldname+'-'+Date.now()+
            path.extname(file.originalname));
    }
});

//Init Upload
const upload = multer({
    storage:storage
}).single('myImage');

//api upload
app.post('/uploadchat',(req, res)=>{
    upload(req, res, (err)=>{
       if (err){
           res.render('index',{
               msg: err
           });
       }  else{
           console.log(req.file);
           res.send('test');
       }
    });
});