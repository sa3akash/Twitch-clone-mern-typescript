import { Application } from "express";
import { mainRouter } from "@/router";

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, mainRouter.routes());
  };
  routes();
};