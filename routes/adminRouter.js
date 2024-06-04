import express from 'express'
import { createCourt } from '../controller/adminController.js'
import upload from '../middleware/UploadMiddleware.js'
import { adminAuth } from '../middleware/authorization.js'

const adminRouter=express.Router()

adminRouter.post("/",
adminAuth,
upload.array("image",5),
createCourt)

export default adminRouter
