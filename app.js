import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'
import adminRouter from './routes/adminRouter.js';


connectDB()
const  app=express()
app.use(cors())
app.use(express.json());

app.use('/', userRoutes);
app.use('/admin', adminRouter);

app.listen(process.env.port,()=>{
    console.log(`Server is running on http://localhost:${process.env.port}`);
})