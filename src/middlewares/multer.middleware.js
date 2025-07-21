 import express from 'express'
 import multer from 'multer'

 const storage =  multer.diskStorage({
    destination: function (req, file ,cb){
        cb(null, '/public/temp')
    },
    filename: function (req , file , cb){
        const uniqSuffix = Date.now() + Math.round(Math.random()*13)
        cb(null,file.fieldname + '-' + uniqSuffix)
    }
 })
export const upload = multer({storage:storage})