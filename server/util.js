const Joi = require("joi");

const defs = {
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
};

defs.changeUser = Joi.object()
    .unknown(false)
    .required()
    .optionalKeys({
        username: defs.username
    });

module.exports.defs = defs;
module.exports.censorUser = function censorUser(user) {
    return user;
};
