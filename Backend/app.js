
import express from 'express'
import cors from 'cors'
const app = express();

import signupUser from './src/Routes/index.js';

app.use(cors({origin : "http://localhost:8082"}));
app.use(express.json());

app.use('/api' , signupUser)


export default app;