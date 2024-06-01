import express, { Application } from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import hpp from "hpp";
import { rateLimit } from "express-rate-limit";
import http from "http";
import { config } from "@/config";
import Logger from "bunyan";
import { errorHandler } from "@/middlewares/globalErrorHandler";
import "express-async-errors";
import routes from "@/routes";
import { Server, Socket } from "socket.io";
import { SocketService } from "./socket";

export class SetupServer {
  private app: Application;
  private log: Logger;

  constructor(app: Application) {
    this.app = app;
    this.log = config.createLogger("setup server");
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cors({
        origin: ["*","http://localhost:5173"],
        credentials: true,
        optionsSuccessStatus: 200,
      })
    );
    app.use(cookieParser());
    app.use(helmet());
    app.use(hpp());
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 100,
        limit: 1000,
        standardHeaders: "draft-7",
        legacyHeaders: false,
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private routesMiddleware(app: Application): void {
    routes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.use((req, res, next) => {
      return next(
        errorHandler.createError(404, `${req.originalUrl} not found.`)
      );
    });
    app.use(errorHandler.handleGlobalError);
  }

  private startServer(app: Application): void {
    const httpServer = http.createServer(app);
    httpServer.listen(config.PORT, () => {
      this.log.info(
        `STARTING SERVER ON PORT ${config.PORT} PROCESS ID =${process.pid}`
      );
    });
  }
  private socketServer(server:http.Server): void {
    
    const io: Server = new Server(server, {
      path: '/socket.io',
      cors: {
        // origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
      }});
    
      const socketService = new SocketService(io);
      socketService.listen()
    
  }
}
