import dataSource from "./config/data-source";
import {app} from "./app";

const port = process.env.PORT || 3000;

dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);