const  multer = require('multer');
/* import multer from "multer"; */
const path = require("path");

 

const filename =(req ,file, next) => {
    let lastindexof = file.originalname.lastIndexOf('.');
    let ext = file.originalname.substring(lastindexof);

    next(null, `img-${Date.now()}${ext}`);
};

const destination = (req, file, next) => {
    next(null,`${__dirname}/../Uploads`);
    /* next(null,`${path.join(__dirname,'Uploads')}`); */
};


const  upload = multer({
    storage:multer.diskStorage({destination,filename}),
});

/* export default upload; */
module.exports = upload ;