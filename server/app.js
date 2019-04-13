const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("log-node")();
require("dotenv").config();
const log = require("log");
const passwordless = require("passwordless");
const RethinkDBStore = require("passwordless-rethinkdbstore");
const session = require("express-session");
const RDBStore = require("session-rethinkdb")(session);
const sgMail = (module.exports.sg = require("@sendgrid/mail"));
sgMail.setApiKey(process.env.SENDGRID_KEY);
const hostURI = process.env.HOST_URI;
const cookieSecret = process.env.COOKIE_SECRET;
const dbOpts = {
    db: process.env.db || `cleddit`
};
if (process.env.DB_ADDR)
    dbOpts.servers = [
        {
            host: process.env.DB_ADDR.split(":")[0],
            port: parseInt(process.env.DB_ADDR.split(":")[1], 10)
        }
    ];
const r = (module.exports.r = require(`rethinkdbdash`)(dbOpts)); // Connect to RethinkDB

app.set("view engine", "ejs");
app.use(express.json());
app.use(require("cookie-parser")());
const store = new RDBStore(r);
app.use(
    session({
        store,
        secret: cookieSecret,
        resave: true,
        saveUninitialized: true,
        name: "cleddit_session"
    })
);

passwordless.init(new RethinkDBStore(dbOpts));
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: "/" }));
app.use("/api", require("./api"));

passwordless.addDelivery(
    async (tokenToSend, uidToSend, recipient, callback, req) => {
        await sgMail.send({
            to: recipient,
            from: process.env.EMAIL_FROM,
            subject: "Cleddit Passwordless Login Code",
            html: `Click <a href="${hostURI}/login/token/${tokenToSend}/${uidToSend}">here</a> to login to Cleddit.`
        });
        callback();
    }
);

app.listen(port, () => log(`Listening on port ${port}`));
