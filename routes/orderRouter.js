import mongoose from "mongoose";
import express from 'express'
import { userAuth } from "../middleware/authorization.js";
import { bookedslot, order, verify } from "../controller/orderController.js";
const orderRouter=express.Router()

orderRouter.post('/',userAuth,order)
orderRouter.post('/verify',userAuth,verify)
orderRouter.get('/',bookedslot)


export default orderRouter