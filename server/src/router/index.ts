import { AuthController } from "@/controllers/AuthController";
import express, { Router } from "express";

class MainRouter {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/register", AuthController.prototype.register);
    this.router.post("/login", AuthController.prototype.login);
    return this.router;
  }
}

export const mainRouter: MainRouter = new MainRouter();
