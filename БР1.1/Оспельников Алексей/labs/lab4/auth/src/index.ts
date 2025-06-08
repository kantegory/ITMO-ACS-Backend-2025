import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import authRouter from "./routes"

const app = express()
app.use(bodyParser.json())
app.listen(9000)
app.use("/api", authRouter);
console.log("Express server has started on port 9000")