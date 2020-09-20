const Joi = require("joi");

const schema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{9}$/)
    .required(),
  message: Joi.string().trim().min(5).max(255).required(),
  files: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required(),
      type: Joi.string().valid("image", "video").required(),
    }).required()
  ),
});

module.exports = schema;
