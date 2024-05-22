import express from 'express'
import { createCourt } from '../controller/adminController.js'
import upload from '../middleware/UploadMiddleware.js'

const adminRouter=express.Router()

adminRouter.post("/",upload.single("image"),createCourt)

export default adminRouter