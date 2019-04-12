const express = require("express");
const app = (module.exports = express.Router());
app.get("/", (req, res) => res.json({ status: "ok", msg: "hello world" }));

app.use("/auth", require("./routes/auth"));
