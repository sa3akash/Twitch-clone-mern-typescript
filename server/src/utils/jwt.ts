import { config } from "@/config";
import jwt from "jsonwebtoken";

interface IPaylowd {
  id: string;
  name: string;
  email: string;
}

class Jwt {
  public createJwt(data: IPaylowd): string {
    return jwt.sign(data, config.JWT_SECRET!, {
      expiresIn: "1h",
    });
  }

  public verifyJwt(token: string) {
    return jwt.verify(token, config.JWT_SECRET!);
  }
}

export const jwtUtils: Jwt = new Jwt();
