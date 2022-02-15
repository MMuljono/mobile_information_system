import express from "express";
import {
  createUserHandler,
  userLoginHandler,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/user/create", createUserHandler);
router.post("/user/login", userLoginHandler);

export default router;
