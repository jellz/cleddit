const express = require("express");
const app = (module.exports = express.Router());
const passwordless = require("passwordless");
const { r } = require("../");
app.get("/", (req, res) => res.json({ status: "ok", msg: "hello world auth" }));

app.post("/token",
    passwordless.requestToken(async (email, delivery, callback, req) => {
        try {
            const user = await r
                .table("users")
                .filter({ email })
                .nth(0)
                .run();
            callback(null, user.id); // yay found
        } catch (error) {
            if (error.message.includes("Index out of bounds")) return callback(null, null); //not found
            callback(error.message); // err
        }
    }),
    async (req, res) => {
        res.json({status: "ok"});
    }
);
