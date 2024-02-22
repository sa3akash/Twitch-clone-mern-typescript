import express, { Express } from "express";
import { SetupServer } from "@/setupServer";
import { config } from "@/config";

class MainApplication {
  initServer() {
    config.validateConfig();
    const app: Express = express();
    const setupServer: SetupServer = new SetupServer(app);
    setupServer.start();
  }
}

const application: MainApplication = new MainApplication();
application.initServer();
