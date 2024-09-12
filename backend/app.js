import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import postRouter from './router/postRouter.js';

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const app = express();

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => console.log('Connected to Database ✅'))
  .catch((error) => console.log('Error connecting to Database ⚠️'));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/posts', postRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on PORT ${SERVER_PORT}`);
});
