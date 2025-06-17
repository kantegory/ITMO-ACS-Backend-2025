import express from 'express';
import proxyRoutes from "./routes/proxyRoutes";

const app = express();

app.use(proxyRoutes);

app.listen(3000, () => {
  console.log('Gateway running on http://localhost:3000');
});
