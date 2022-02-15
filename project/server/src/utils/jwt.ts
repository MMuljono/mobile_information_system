import jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.server.token.secret);
    return decoded;
  } catch (e) {
    return null;
  }
};

export const decodeJwt = async (token: string) => {
  return await jwt.decode(token);
};

export const signJwt = async (userData: { email: string; id: number }) => {
  return await jwt.sign(
    { email: userData.email, userId: userData.id },
    config.server.token.secret,
    { expiresIn: config.server.token.expireTime }
  );
};
