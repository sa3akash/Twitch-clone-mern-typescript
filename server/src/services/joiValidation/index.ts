import {
  LoginJoiSchema,
  updatePassword,
} from "@/services/joiValidation/LoginValidation";
import { registerJoiSchema } from "@/services/joiValidation/RegisterValidation";
import {
  ChannelIdSchema,
  updateSettins,
} from "@/services/joiValidation/ChannelValidation";

export {
  LoginJoiSchema,
  registerJoiSchema,
  ChannelIdSchema,
  updateSettins,
  updatePassword,
};
