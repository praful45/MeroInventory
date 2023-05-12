const multer = require('multer');

//img storage path
const imgconfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"../uploads");
},
filename: (req, file, cb) => {
    cb(null,`image-${Date.now()}.${file.originalname}`);
}
})


//img filter
const isImage = (req,file,cb)=>{
    if(file.mimetype.startswith("image")){cb(null,true)
    }else{cb(new Error("Only images is allowed"))
}
}

const upload = multer({
    storage: imgconfig,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB file size limit
      },
    fileFilter:isImage
})
