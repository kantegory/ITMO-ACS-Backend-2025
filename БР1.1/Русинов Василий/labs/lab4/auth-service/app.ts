import express from 'express';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(express.json());

app.use("/", userRoutes);
app.use("/", authRoutes);

export default app;
