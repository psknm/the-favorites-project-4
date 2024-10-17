import mongoose from "mongoose";
import express from 'express';
import helmet from 'helmet';
import { dbURL, port } from './config/index.js';
import carRouter from "./routes/car.js";
import driverRouter from "./routes/driver.js";
import teamRouter from "./routes/team.js"
import trackRouter from "./routes/track.js";
import cors from 'cors';

const app = express();

app.set('port', port);

app.use(express.json())

mongoose.connect(dbURL).then(() => {
    console.log("DB Connected")
})

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

app.use(cors());
app.use(helmet())
app.use("/cars", carRouter)
app.use("/drivers", driverRouter)
app.use("/teams", teamRouter)
app.use("/tracks", trackRouter)


export default app;