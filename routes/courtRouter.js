import express from 'express'
import { deleteCourt, getSingleCourt, getcourtData } from '../controller/courtController.js'
const courtRouter=express.Router()
courtRouter.get('/',getcourtData)
courtRouter.get('/singleCourt/:id',getSingleCourt)
courtRouter.delete('/:id',deleteCourt)


export default courtRouter