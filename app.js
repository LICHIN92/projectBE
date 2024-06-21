import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'
import adminRouter from './routes/adminRouter.js';
import courtRouter from './routes/courtRouter.js';


connectDB()
const app = express()
// https://turfshub.netlify.app/
app.use(cors({ origin: 'http://localhost:5173' }));
// app.use(cors({ origin: 'https://turfz.netlify.app/' }));

app.use(express.json());

app.use('/', userRoutes);
app.use('/admin', adminRouter);
app.use('/court', courtRouter)

app.listen(process.env.port, () => {
  console.log(`Server is running on http://localhost:${process.env.port}`);
})

