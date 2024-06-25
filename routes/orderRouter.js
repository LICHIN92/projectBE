import mongoose from "mongoose";
import express from 'express'
import { userAuth } from "../middleware/authorization.js";
import { order } from "../controller/orderController.js";
const orderRouter=express.Router()

orderRouter.post('/',userAuth,order)


export default orderRouter