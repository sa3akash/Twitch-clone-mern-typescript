import { Socket, io } from "socket.io-client";

class SocketService {
  public socket: Socket;

  constructor() {
    this.socket = io("http://localhost:5500", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true,
      query: {
        authId:123,
      },
    });
  }

  public start() {
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  }
}

export const socketService: SocketService = new SocketService();
