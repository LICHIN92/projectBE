import express from 'express'
import { getcourtData } from '../controller/courtController.js'
const courtRouter=express.Router()
courtRouter.get('/',getcourtData)


export default courtRouter