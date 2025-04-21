"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const data_source_1 = require("./data-source");
const userRouter_1 = require("./router/userRouter");
const messageRouter_1 = require("./router/messageRouter");
const rentRouter_1 = require("./router/rentRouter");
const reviewRouter_1 = require("./router/reviewRouter");
const propertyRouter_1 = require("./router/propertyRouter");
data_source_1.AppDataSource.initialize()
    .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use("/api", userRouter_1.default);
    app.use("/api", messageRouter_1.default);
    app.use("/api", rentRouter_1.default);
    app.use("/api", reviewRouter_1.default);
    app.use("/api", propertyRouter_1.default);
    app.listen(3000);
    console.log("Express server has started on port 3000.");
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map