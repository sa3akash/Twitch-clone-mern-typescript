import Joi, { ObjectSchema } from "joi";

const registerJoiSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(30).messages({
    "string.base": "Name must be of type string.",
    "string.min": "Name must be 3 charecters.",
    "string.max": "Name must be less then 30 charecters.",
    "string.empty": "Name is a required field.",
    "any.required": "Name is a required field.",
  }),
  password: Joi.string().required().min(6).max(30).messages({
    "string.base": "Password must be of type string.",
    "string.min": "Invalid password.",
    "string.max": "Invalid password.",
    "string.empty": "Password is a required field.",
    "any.required": "Password is a required field.",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email must be of type string.",
    "string.email": "Email must be valid.",
    "string.empty": "Email is a required field.",
    "any.required": "Email is a required field.",
  }),
});

export { registerJoiSchema };
