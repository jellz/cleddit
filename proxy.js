const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const proxy = require("http-proxy-middleware");

const clientProxy = proxy({ target: "http://localhost:8080", ws: true });
app.use("/api", proxy({ target: "http://localhost:3001" }));
app.use("/", clientProxy);

const server = app.listen(port);

setTimeout(() => {
    console.log("\n".repeat(5));
    console.log(`Listening on:  http://localhost:${port}`);
    console.log("\n".repeat(5));
}, 1000 * 5);

server.on("upgrade", clientProxy.upgrade);