import { errorHandler } from "@/middlewares/globalErrorHandler";
import { Channel } from "@/model/Channel";
import { User } from "@/model/User";
import { v4 as uuid } from "uuid";

import {
  joiParamsValidation,
  joiValidation,
} from "@/services/decorators/joiDecorator";
import {
  ChannelIdSchema,
  updatePassword,
  updateSettins,
} from "@/services/joiValidation";

import { NextFunction, Request, Response } from "express";

export class ChannelController {
  @joiParamsValidation(ChannelIdSchema)
  public async getChannelById(req: Request, res: Response, next: NextFunction) {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId);
    if (!channel || !channel.isActive)
      return next(errorHandler.createError(404, "Channel not found."));

    const user = await User.findOne(
      { channel: channel._id },
      { _id: 1, name: 1, email: 1 }
    );

    res.status(200).json({
      _id: channel._id,
      title: channel.title,
      desc: channel.desc,
      name: user?.name,
      email: user?.email,
      isOnline: channel.isActive,
      streamUrl: "http",
    });
  }

  public async channels(req: Request, res: Response, next: NextFunction) {
    const users = (await User.find({}).populate("channel"))
      .filter((u: any) => u.channel.isActive)
      .map((u: any) => {
        return {
          _id: u.channel._id,
          title: u.channel.title,
          desc: u.channel.desc,
          name: u.name,
          email: u.email,
          isOnline: u.channel.isActive,
        };
      });

    res.status(200).json(users);
  }

  @joiValidation(updateSettins)
  public async updateChannel(req: Request, res: Response, next: NextFunction) {
    const { name, avaterUrl, desc, title } = req.body;

    const user = await User.findById(req.user?.id);
    if (!user) return next(errorHandler.createError(404, "User not fount."));

    if (user?.name !== name) {
      await User.findByIdAndUpdate(req.user?.id, { name });
    }
    await Channel.findByIdAndUpdate(user?.channel, {
      avaterUrl,
      desc,
      title,
      isActive: true,
    });

    res.status(200).json({
      channelId: user.channel,
      name,
      title,
      desc,
      avaterUrl,
      isActive: true,
    });
  }

  @joiValidation(updatePassword)
  public async updatePassword(req: Request, res: Response, next: NextFunction) {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?.id);
    if (!user) return next(errorHandler.createError(404, "User not fount."));

    if (!user.comparePassword(oldPassword)) {
      return next(errorHandler.createError(503, "Invalid old password"));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password Updated Successfull." });
  }

  public async updateStreamKey(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = await User.findById(req.user?.id);
    if (!user) return next(errorHandler.createError(404, "User not fount."));

    const channel = await Channel.findByIdAndUpdate(
      user.channel,
      { streamKey: uuid() },
      { new: true }
    );

    res.status(200).json({
      message: "Stream Key Updated Successfull.",
      streamKey: channel?.streamKey,
    });
  }

  @joiValidation(ChannelIdSchema)
  public async followChannel(req: Request, res: Response, next: NextFunction) {
    const { channelId } = req.body;

    const user = await User.findById(req.user?.id);
    if (!user) return next(errorHandler.createError(404, "User not fount."));

    if (`${user.channel}` === channelId) {
      return next(
        errorHandler.createError(503, "You conn't follow your self.")
      );
    }

    if (user.followedChannel.includes(channelId)) {
      await user.updateOne({ $pull: { followedChannel: channelId } });
    } else {
      await user.updateOne({ $push: { followedChannel: channelId } });
    }

    res.status(200).json({ message: "Follow Updated." });
  }

  public async getFollowerChannel(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = await User.findById(req.user?.id);
    if (!user) return next(errorHandler.createError(404, "User not fount."));
    res.status(200).json(user.followedChannel);
  }
}
