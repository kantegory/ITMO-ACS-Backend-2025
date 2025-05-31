import express from 'express'
import { AppDataSource } from "./AppDataSource"
import config from './config';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import { RegisterRoutes } from "./routes"

import { Video } from './models/Video'
import { sendToQueue, listenToQueue } from './rabbit'

const app = express()
const PORT = config.APP_PORT

app.use(express.json())

RegisterRoutes(app)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`http://0.0.0.0:${PORT}`)
  })
}).catch(error => console.log(error))

const repository = AppDataSource.getRepository(Video)

const getVideos = async (channelId: string, maxResults: number = 50) => {
  const uploads = 'UULF' + channelId.slice(2)
  const videos: any = await (await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=${maxResults}&playlistId=${uploads}&key=${config.YT_API_KEY}`)).json()
  const videosList: Video[] = []
  for(let m of videos['items']){
    m = m['snippet']
    videosList.push({
      'id': m['resourceId']['videoId'],
      'channelId': m['channelId'],
      'title': m['title'],
      'publishedAt': m['publishedAt'],
      'thumbnail': m['thumbnails']['maxres' in m['thumbnails'] ? 'maxres' : 'medium']['url'],
      'description': m['description'],
    } as Video)
  }
  return repository.save(videosList)
}

const deleteVideos = async (channelId: string) => {
  await repository.delete({ channelId: channelId })
}

listenToQueue('add_videos', (content) => getVideos(content.channelId))
listenToQueue('delete_videos', (content) => deleteVideos(content.channelId))