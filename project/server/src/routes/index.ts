import express, { Request, Response } from "express";
import user from "./user.routes";
import event from "./event.routes";

const router = express.Router();

router.use(user);
router.use(event);

export default router;
