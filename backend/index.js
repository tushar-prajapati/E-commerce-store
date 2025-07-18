import path from "path";
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from "./middlewares/errorHandler.js";
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(cors({
    origin: "https://e-commerce-store-nu-six.vercel.app/", // For production, uncomment this line and comment the below line
    // origin: "*", // For local development, uncomment this line and comment the above line
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname+'/uploads')))

app.use(errorHandler);


app.listen(port, ()=>{console.log(`Server running on PORT: ${port}`)});

