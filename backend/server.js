import express, { json } from 'express';
import cors from 'cors';
import knex from 'knex';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes.js';

// load environment variables
dotenv.config();

// creates express server
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(json());

// routes
app.use('/api/items', itemRoutes);

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});