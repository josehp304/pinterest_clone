const multer = require('multer')
const {v4:uuidv4} = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/uploads/')
    },
    filename:function(req,file,cb){
        const extention = path.extname(file.originalname)
        const filename = uuidv4()
        cb(null,filename+extention)
    }
})

const upload = multer({storage:storage})
module.exports = upload