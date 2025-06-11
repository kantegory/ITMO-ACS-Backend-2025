import { App } from "./app";

const app = new App();
const port = Number(process.env.APP_PORT) ?? 8003;

(async () => {
    await app.init();
    app.listen(port);
})();