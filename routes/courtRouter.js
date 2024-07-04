import express from 'express'
import { deleteCourt, getSingleCourt, getcourtData, mycourtCourts, updateCourt } from '../controller/courtController.js'
import { userAuth } from '../middleware/authorization.js'
const courtRouter=express.Router()
courtRouter.get('/',getcourtData)
courtRouter.get('/singleCourt/:id',getSingleCourt)
courtRouter.delete('/:id',deleteCourt)
courtRouter.get('/mycourt/:id',mycourtCourts)
courtRouter.patch('/:id',updateCourt)


export default courtRouter