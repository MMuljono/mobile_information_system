import dotenv from "dotenv";

dotenv.config();

const ServerConfig = {
  port: process.env.PORT_SERVER || 8080,
  token: {
    expireTime: process.env.TOKEN_EXPIRE_TIME || 5000,
    secret: process.env.TOKEN_SECRET || "supersecrettoken",
  },
  userAgent: process.env.USER_AGENT || "Your own custom User Agent",
};

const config = {
  server: ServerConfig,
};

export default config;
