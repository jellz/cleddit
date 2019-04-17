const express = require("express");
const app = (module.exports = express.Router());
const passwordless = require("passwordless");
const { r } = require("..");
const { ratelimit } = require("../api");
const eJoi = require("express-joi-middleware");
const Joi = require("joi");
const joiDefs = require("../util").defs;
app.get("/", (req, res) => res.json({ status: "ok", msg: "hello world auth" }));

app.post("/logout", passwordless.logout(), (req, res) => {
    res.json({ status: "ok" });
});

app.get("/status", (req, res) => {
    res.json({
        status: "error: Use /api/auth/me instead",
        auth: req.user ? "user" : "anon"
    });
});

app.get("/me", (req, res) => {
    res.status(req.user ? 200 : 404).json({ status: "ok", data: req.user });
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
            if (error.toString().includes("Index out of bounds")) {
                const u = { email, username: null };
                const rethinkres = await r
                    .table("users")
                    .insert(u)
                    .run();
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
        if (!req.user) return res.sendStatus(401);
        res.json({ status: "ok" });
    }
);

app.post(
    "/username",
    eJoi(
        {
            body: Joi.object().keys({
                username: joiDefs.username.required()
            })
        },
        { joi: Joi, wantResponse: true }
    ),
    async (req, res) => {
        req.user.username = req.body.username;
        if (
            (await r
                .table("users")
                .filter({ username: req.body.username })
                .count()
                .run()) != 0
        ) {
            return res
                .status(409)
                .json({ status: "error: Username already exists" });
        }
        await r
            .table("users")
            .update(req.user)
            .run();
        res.json({ status: "ok" });
    }
);
