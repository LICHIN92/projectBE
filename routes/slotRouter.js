import express from 'express'
import { model } from 'mongoose'
import { adminAuth } from '../middleware/authorization.js'
import { createSlot, getSlotData } from '../controller/slotsController.js'
const slotRouter=express.Router()

slotRouter.post('/:courtId',adminAuth,createSlot)
slotRouter.get('/',getSlotData)

export default slotRouter