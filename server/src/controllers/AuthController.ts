import { errorHandler } from "@/middlewares/globalErrorHandler";
import { Channel } from "@/model/Channel";
import { User } from "@/model/User";
import { joiValidation } from "@/services/decorators";
import { LoginJoiSchema, registerJoiSchema } from "@/services/joiValidation";
import { jwtUtils } from "@/utils/jwt";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  @joiValidation(registerJoiSchema)
  public async register(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return next(errorHandler.createError(409, "User already exists."));
    }

    const channel = await Channel.create({});

    const user = await User.create({
      name,
      email,
      password,
      channel:channel._id
    });

    const token: string = jwtUtils.createJwt({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(201).json({
      message: "User register successfull",
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        token,
      },
    });
  }

  @joiValidation(LoginJoiSchema)
  public async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return next(errorHandler.createError(403, "Invalid creadentials"));
    }

    const token: string = jwtUtils.createJwt({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "User login successfull",
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        token,
      },
    });
  }
}
