import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

import postRouters from './routes/posts.js';
import userRoutes from './routes/users.js';


const app = express();
dotenv.config();

mongoose.set('strictQuery', false);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRouters);
app.use('/user', userRoutes);


const PORT = process.env.PORT || 5000;
const db = process.env.CONNECTION_URL;

await mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology : true })
    .then(() => app.listen(PORT, () => console.log(`The Server is running at PORT :${PORT}`)))
    .catch((error) => console.log(error));







