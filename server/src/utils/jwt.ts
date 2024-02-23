import { config } from "@/config";
import jwt from "jsonwebtoken";

export interface IPaylowd {
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

  public verifyJwt(token: string,fn:(err:jwt.VerifyErrors | null,user:string | jwt.JwtPayload | undefined)=>void) {
    return jwt.verify(token, config.JWT_SECRET!,fn);
  }
}

export const jwtUtils: Jwt = new Jwt();
