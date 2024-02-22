import axios, { AxiosInstance } from "axios";
import { ILogin, IRegister } from "../interfaces";

class Api {
  private apiCall: AxiosInstance;

  constructor() {
    this.apiCall = axios.create({
      baseURL: "http://localhost:5500/api/v1",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public login(data: ILogin) {
    return this.apiCall.post("/login", data);
  }
  public register(data: IRegister) {
    return this.apiCall.post("/register", data);
  }
}

export const api: Api = new Api();
