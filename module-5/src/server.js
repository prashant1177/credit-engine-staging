

import express from "express";
import bodyParser from "body-parser";
import { enRoll } from "./controller/enroll.controller.js";
import { creditUser } from "./controller/credit.controller.js";
import dotenv from "dotenv"
dotenv.config()


const app = express()
const PORT = process.env.PORT||3000
app.use(bodyParser.json())

app.post("/api/enroll",enRoll)
app.get("/api/credits/:userId",creditUser)





app.listen(PORT,()=>{
    console.log(`server is running on the PORT: ${PORT}`)
})