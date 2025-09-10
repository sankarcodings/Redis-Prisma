
import dotenv from "dotenv";

import app from './app.js'
import {PORT} from '../Backend/src/config/env.js'

dotenv.config();

const port = PORT || 5000;


app.listen(port , () => {
    console.log(`Server Running in ${port}`)
})