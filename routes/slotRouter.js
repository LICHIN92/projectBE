import express from 'express'
import { model } from 'mongoose'
import { adminAuth } from '../middleware/authorization.js'
import { createSlot } from '../controller/slotsComtroller.js'
const slotRouter=express.Router()

slotRouter.post('/:courtId',createSlot)

export default slotRouter