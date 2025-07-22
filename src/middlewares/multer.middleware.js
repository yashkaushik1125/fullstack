
 import multer from 'multer'

 const storage =  multer.diskStorage({
    destination: function (req, file ,cb){
        cb(null, "/fullstack_project/public/temp")
    },
    filename: function (req , file , cb){
        //const uniqSuffix = Date.now() + Math.round(Math.random()*13)
        cb(null,file.originalname)
    }
 })
export const upload = multer({storage,})