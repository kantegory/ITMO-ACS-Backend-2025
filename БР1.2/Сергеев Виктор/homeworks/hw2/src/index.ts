import { AppDataSource } from "./data-source"
import express = require("express");
import bodyParser = require("body-parser");
import userRouter from "./routes/UserRouter"

AppDataSource.initialize()
.then(async () => {
    console.log("db initiated")
}).catch(error => console.log(error))

const app = express();
app.use(bodyParser.json())
app.use("/api/user", userRouter)

app.listen(3000);