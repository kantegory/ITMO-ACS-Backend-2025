import express from 'express'
import { AppDataSource } from "./AppDataSource"
import categoryRouter from "./routers/Category"
import channelRouter from "./routers/Channel"
import reviewRouter from "./routers/Review"
import roleRouter from "./routers/Role"
import themeRouter from "./routers/Theme"
import userRouter from "./routers/User"
import videoRouter from "./routers/Video"

const app = express()
const PORT = 3000

app.use(express.json())
app.use('/category', categoryRouter)
app.use('/channel', channelRouter)
app.use('/review', reviewRouter)
app.use('/role', roleRouter)
app.use('/theme', themeRouter)
app.use('/user', userRouter)
app.use('/video', videoRouter)

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`)
  })
}).catch(error => console.log(error))