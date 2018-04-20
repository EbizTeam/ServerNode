const express = require('express');
var apiRoutes = express.Router();
const multer = require('multer');
const path = require('path');



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

//api upload
apiRoutes.post('/uploadchat',(req, res)=>{
    upload(req, res, (err)=>{
        if (err){
            res.render('index',{
                msg: err
            });
        }  else{
            console.log(req.file);

            res.send(req.file.filename);
        }
    });
});


module.exports = apiRoutes;