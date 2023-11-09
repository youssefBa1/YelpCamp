const joi=require('joi');
const campGorund = require('./views/modules/campGorund');

module.exports.campgorundSchema= Joi.object({
    campground:Joi.object({
        title:Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().required(),
        location:Joi.string().required(),
        description:Joi.string().required()
    }).required()
});