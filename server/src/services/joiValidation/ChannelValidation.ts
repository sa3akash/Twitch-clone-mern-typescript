import Joi, { ObjectSchema } from "joi";

const ChannelIdSchema: ObjectSchema = Joi.object().keys({
  channelId: Joi.string().required().min(6).max(30).messages({
    "string.base": "ChannelId must be of type string.",
    "string.empty": "ChannelId is a required field.",
    "any.required": "ChannelId is a required field.",
  }),
});
const updateSettins: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().min(6).max(30).messages({
    "string.base": "Name must be of type string.",
    "string.empty": "Name is a required field.",
    "any.required": "Name is a required field.",
  }),
  desc: Joi.string().required().min(10).max(300).messages({
    "string.base": "Description must be of type string.",
    "string.empty": "Description is a required field.",
    "any.required": "Description is a required field.",
  }),
  title: Joi.string().required().min(10).max(300).messages({
    "string.base": "Title must be of type string.",
    "string.empty": "Title is a required field.",
    "any.required": "Title is a required field.",
  }),
  avaterUrl: Joi.string().required().min(10).max(300).messages({
    "string.base": "Avater Url must be of type string.",
    "string.empty": "Avater Url is a required field.",
    "any.required": "Avater Url is a required field.",
  }),
});

export { ChannelIdSchema,updateSettins };
