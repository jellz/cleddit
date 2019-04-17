const Joi = require("joi");

const defs = {
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
};

module.exports.defs = defs;
module.exports.censorUser = function censorUser(user) {
    return user;
}
