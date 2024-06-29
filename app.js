import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'
import adminRouter from './routes/adminRouter.js';
import courtRouter from './routes/courtRouter.js';
import slotRouter from './routes/slotRouter.js';
import orderRouter from './routes/orderRouter.js';


connectDB()
const app = express()
app.use(cors({
  origin: 'https://turfhub.netlify.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

app.use(express.json());

app.use('/', userRoutes);
app.use('/admin', adminRouter);
app.use('/court', courtRouter)
app.use('/Slot', slotRouter)
app.use('/Order', orderRouter)

app.listen(process.env.port, () => {
  console.log(`Server is running on http://localhost:${process.env.port}`);
})

