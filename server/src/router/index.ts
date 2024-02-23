import { AuthController } from "@/controllers/AuthController";
import { ChannelController } from "@/controllers/ChannelController";
import { authMiddleware } from "@/middlewares/authMiddleware";
import express, { Router } from "express";

class MainRouter {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/register", AuthController.prototype.register);
    this.router.post("/login", AuthController.prototype.login);
    this.router.get("/channels", ChannelController.prototype.channels);
    this.router.get("/channel/:channelId",authMiddleware, ChannelController.prototype.getChannelById);
    this.router.put("/channel",authMiddleware, ChannelController.prototype.updateChannel);
    this.router.put("/user/update-password",authMiddleware, ChannelController.prototype.updatePassword);
    this.router.put("/channel/update-stream-key",authMiddleware, ChannelController.prototype.updateStreamKey);
    this.router.post("/channel/follow",authMiddleware, ChannelController.prototype.followChannel);
    this.router.get("/followers/channel",authMiddleware, ChannelController.prototype.getFollowerChannel);
    return this.router;
  }
}

export const mainRouter: MainRouter = new MainRouter();
