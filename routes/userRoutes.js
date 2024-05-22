import express from 'express'
import { signin, signup } from '../controller/userController.js';

const userRoutes=express.Router()

userRoutes.post("/",signin)
userRoutes.post('/signup',signup)

export default userRoutes