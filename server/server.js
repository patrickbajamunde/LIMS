import "./loadEnv.js"

import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import route from "./router/sampleRouter.js"
import authRouter from "./router/authRouter.js"
import clientRouter from "./router/clientRouter.js"
import reportRouter from "./router/reportRouter.js"
import dbControlRouter from "./router/dbControlRouter.js"
import activityRouter from "./router/activityRouter.js"
import cors from "cors"
import session from "./middleware/sessionConfig.js"

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true}))
app.use(session);


const PORT = process.env.PORT||7001;
const DBURL = process.env.MONGO_URL;

mongoose
        .connect(DBURL)
        .then(()=>{
            console.log("DB connected successfully.")
            app.listen(PORT, () => {
                console.log(`Server is running on port: ${PORT}`)
            })
        })
        .catch((error) => console.log(error))

app.use("/api", route);
app.use("/api/auth", authRouter);
app.use("/api/client", clientRouter);
app.use("/api/report", reportRouter);
app.use("/api/dbcontrol", dbControlRouter);
app.use("/api/activity", activityRouter);

