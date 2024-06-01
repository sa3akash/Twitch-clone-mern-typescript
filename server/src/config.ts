import dotenv from "dotenv";
import bunyan from "bunyan";

dotenv.config();

class Config {
  public MONGO_URI = process.env.MONGO_URI;
  public PORT = process.env.PORT;
  public NODE_ENV = process.env.NODE_ENV;
  public JWT_SECRET = process.env.JWT_SECRET;

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined || value === null) {
        throw new Error(`${key} env is not defined.`);
      }
    }
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({
      name: name,
      level: "debug",
    });
  }
}

export const config: Config = new Config();

// class BunyanMongooseStream {
//   write(record: any) {
//     ErrorLog.create({ data: JSON.parse(record) })
//   }
// }
