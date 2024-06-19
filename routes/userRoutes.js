import express from 'express'
import { deleteAccount, getdata, signin, signup, usercount } from '../controller/userController.js';

const userRoutes=express.Router()

userRoutes.post("/",signin)
userRoutes.post('/signup',signup)
userRoutes.get('/usercount',usercount)
userRoutes.delete('/delete/:id',deleteAccount)
userRoutes.get('/userdata',getdata)

export default userRoutes