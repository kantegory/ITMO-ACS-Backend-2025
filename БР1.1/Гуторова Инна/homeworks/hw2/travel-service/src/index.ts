import express from 'express';
import { AppDataSource } from './data-source';
import router from './routers/userRouter';
import routeRouter from './routers/routeRouter';
import tripRouter from './routers/tripRouter';
import attractionRouter from './routers/attractionRouter';
import bookingRouter from './routers/bookingRouter';
import favoriteRouter from './routers/favoriteRouter';
import commentRouter from './routers/commentRouter';
import reviewRouter from './routers/reviewRouter';
import travelTypeRouter from './routers/travelTypeRouter';
import mediaRouter from './routers/mediaRouter';

const app = express();
const PORT = 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log("Database connected!"))
  .catch(err => console.error("Database connection error:", err));

app.use('/users', router);
app.use('/routes', routeRouter);
app.use('/trips', tripRouter);
app.use('/attractions', attractionRouter);
app.use('/bookings', bookingRouter);
app.use('/favorites', favoriteRouter);
app.use('/comments', commentRouter);
app.use('/reviews', reviewRouter);
app.use('/travel-types', travelTypeRouter);
app.use('/media', mediaRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});