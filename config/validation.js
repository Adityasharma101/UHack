const Joi = require("Joi");


// REGISTRATION VALIDATION USING Joi
const registerValidation = (data) => {
    const schema =Joi.object( {
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/))
      .required()
      .messages({
        'string.base': `"a" should be a type of 'text'`,
        'string.empty': `"a" cannot be an empty field`,
        'string.min': `"a" should have a minimum length of {#limit}`,
        'any.required': `"a" is a required field`
      })
    ,
  });

  return schema.validate(data);
};



// LOGIN VALIDATION USING Joi
const loginValidation = (data) => {
  const schema =Joi.object( {
    email: Joi.string().required().email(),
    password: Joi.string()
      .pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/))
      .required(),
  });

  return schema.validate(data);
};




// EXPORTING VALIDATIONS
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
