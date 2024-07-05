import express from 'express'
import { changePassword, deleteAccount, getdata, signin, signup, updatesuser, usercount } from '../controller/userController.js';
import { userAuth } from '../middleware/authorization.js';

const userRoutes=express.Router()

userRoutes.post("/",signin)
userRoutes.post('/signup',signup)
userRoutes.get('/usercount',usercount)
userRoutes.delete('/delete/:id',userAuth,deleteAccount)
userRoutes.get('/userdata',getdata)
userRoutes.patch('/updates/:id',userAuth,updatesuser)
userRoutes.patch('/changePassword',changePassword)

export default userRoutes