import express from 'express'
import { model } from 'mongoose'
import { adminAuth } from '../middleware/authorization.js'
import { createSlot } from '../controller/slotsController.js'
const slotRouter=express.Router()

slotRouter.post('/:courtId',adminAuth,createSlot)

export default slotRouter