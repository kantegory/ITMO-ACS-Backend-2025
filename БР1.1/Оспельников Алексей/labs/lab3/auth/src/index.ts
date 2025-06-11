import { AuthService } from "./service/AuthService";

const express = require('express');

const app = express();
app.use(express.json());

const authService = new AuthService();
app.post('/register', authService.register);

app.post('/login', authService.login);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Authentication service listening on port ${port}`);
});