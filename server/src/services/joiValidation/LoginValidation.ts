import Joi, { ObjectSchema } from "joi";

const LoginJoiSchema: ObjectSchema = Joi.object().keys({
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

export { LoginJoiSchema };
