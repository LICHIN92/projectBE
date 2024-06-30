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

const allowedOrigins = [
  'https://project-fe-gilt.vercel.app',
  'http://localhost:5173',
  'https://turfhub.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Block requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/', userRoutes);
app.use('/admin', adminRouter);
app.use('/court', courtRouter)
app.use('/Slot', slotRouter)
app.use('/Order', orderRouter)

app.listen(process.env.port, () => {
  console.log(`Server is running on http://localhost:${process.env.port}`);
})

