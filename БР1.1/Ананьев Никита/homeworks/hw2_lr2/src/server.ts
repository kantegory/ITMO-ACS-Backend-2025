import { App } from "./app";

const app = new App();
const port = Number(process.env.PORT) ?? 8080

app.listen(port);
