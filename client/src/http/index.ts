import axios, { AxiosInstance } from "axios";
import { ILogin, IRegister } from "../interfaces";

class Api {
  private apiCall: AxiosInstance;
  private isRetry:boolean = false;

  constructor() {
    this.apiCall = axios.create({
      baseURL: "http://localhost:5500/api/v1",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.apiCall.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest && !this.isRetry) {
          this.isRetry = true;
          localStorage.clear();
          sessionStorage.clear();
          window.location.replace('/login');
        }
        throw error;
      },
    );

  }

  public login(data: ILogin) {
    return this.apiCall.post("/login", data);
  }
  public register(data: IRegister) {
    return this.apiCall.post("/register", data,);
  }
}

export const api: Api = new Api();
