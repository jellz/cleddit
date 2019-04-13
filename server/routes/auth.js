const express = require("express");
const app = (module.exports = express.Router());
const passwordless = require("passwordless");
const { r } = require("..");
const { ratelimit } = require("../api");
app.get("/", (req, res) => res.json({ status: "ok", msg: "hello world auth" }));

app.post("/logout", passwordless.logout(), (req, res) => {
    res.json({status: "ok"});
});

app.get("/status", (req, res) => {
    res.json({status: "ok", auth: req.user ? "user" : "anon"});
});


app.post(
    "/token",
    ratelimit,
    passwordless.requestToken(async (email, delivery, callback, req) => {
        try {
            const user = await r
                .table("users")
                .filter({ email })
                .nth(0)
                .run();
            callback(null, user.id); // yay found
        } catch (error) {
            if (error.message.includes("Index out of bounds")) {
                const u = { email, username: null };
                const rethinkres = await r.table("users").insert(u).run();
                u.id = rethinkres.generated_keys[0];
                req.newUser = true; // for the code in app.js to catch
                callback(null, u.id);
                
            }
            callback(error.message); // err
        }
    }),
    async (req, res) => {
        res.json({ status: "ok" });
    }
);

app.post(
    "/login",
    ratelimit,
    passwordless.acceptToken({ allowPost: true }),
    async (req, res) => {
        res.json({status: "ok"});
    }
);
