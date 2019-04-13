const express = require("express");
const errorHandler = require("api-error-handler");
const app = (module.exports = express.Router());
const RateLimit = require("express-rate-limit");

module.exports.ratelimit = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30
});


app.use(errorHandler());
app.get("/", (req, res) => res.json({ status: "ok", msg: "hello world" }));

app.use("/auth", require("./routes/auth"));
