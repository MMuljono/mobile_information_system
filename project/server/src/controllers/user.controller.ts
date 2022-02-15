import { Request, Response } from "express";
import { createUser, findUser } from "../services/user.service";
import { signJwt } from "../utils/jwt";
import bcrypt from "bcryptjs";

export const userLoginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await findUser(email);
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const jwt = await signJwt({ email: user.email, id: user.id });
        res.status(200).json({
          message: "Auth Successful",
          token: jwt,
        });
      } else {
        res.status(404).json({ message: "Password not matched" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(404).json({ message: "Error" });
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  const { password, ...user } = req.body;
  const hashedPW = await bcrypt.hash(password, 10);
  try {
    await createUser({
      ...user,
      password: hashedPW,
    });

    return res.status(200).json({
      message: "User created",
    });
  } catch (e) {
    console.log("error", e);
    res.status(404).json({ message: "Error" });
  }
};
