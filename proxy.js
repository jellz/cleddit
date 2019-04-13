const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const proxy = require("express-http-proxy");

app.use("/api", proxy("http://localhost:3001"))
app.use("/", proxy("http://localhost:8080"));

app.listen(port, () => console.log(`Listening on port ${port}`));
