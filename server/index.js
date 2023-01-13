import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

import postRouters from './routes/posts.js';


const app = express();
dotenv.config();

mongoose.set('strictQuery', false);
// mongoose.set('useFindAndModify', true);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRouters);

// const CONNECTION_URL = 'mongodb+srv://testBoy:rino88@cluster0.b4sujqs.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser : true, useUnifiedTopology : true })
    .then(() => app.listen(PORT, () => console.log(`The Server is running at PORT :${PORT}`)))
    .catch((error) => console.log(error));







