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


const updatePassword: ObjectSchema = Joi.object().keys({
  oldPassword: Joi.string().required().min(6).max(30).messages({
    "string.base": "Old password must be of type string.",
    "string.min": "Invalid Old password.",
    "string.max": "Invalid Old password.",
    "string.empty": "Old password is a required field.",
    "any.required": "Old password is a required field.",
  }),
  newPassword: Joi.string().required().min(6).max(30).messages({
    "string.base": "New password must be of type string.",
    "string.min": "Invalid New password.",
    "string.max": "Invalid New password.",
    "string.empty": "New password is a required field.",
    "any.required": "New password is a required field.",
  }),

});

export { LoginJoiSchema,updatePassword };
