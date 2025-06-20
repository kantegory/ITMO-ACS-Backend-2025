import express from 'express'
import { AppDataSource } from "./AppDataSource"
import config from './config';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import { RegisterRoutes } from "./routes"

const app = express()
const PORT = config.APP_PORT

app.use(express.json())

RegisterRoutes(app)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`)
  })
}).catch(error => console.log(error))