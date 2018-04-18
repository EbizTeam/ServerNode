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

app.get('/',(rep,res)=>res.render('index'));

//set storage engine
const storage  = multer.diskStorage({
    destination:'./public/uploadchat/',
    filename:function (req, file, cb) {
        cb(null,file.fieldname +'-'+Date.now()+
            path.extname(file.originalname));
    }
});

//Init Upload
const upload = multer({
    storage: storage,
   /*  limits:{fileSize:1240000},
    fileFilter:function (file, cb) {
        checkFileType(file, cb);
    } */
	
	 fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
	
}).single('myImage');

//check file type
function checkFileType(file, cb){
    //allowed extfileTypes
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test( path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }else{
        cb('Error: Images Only');
    }
}

//api upload
app.post('/uploadchat',(req, res)=>{
    upload(req, res, (err)=>{
        if (err){
            res.render('index',{
                msg: err
            });
        }  else{
            console.log(req.file);

            res.send(req.file.path);
        }
    });
});


//public
app.use(express.static('./public'));


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.listen(port, () => console.log(`Server started on port ${port}`));


