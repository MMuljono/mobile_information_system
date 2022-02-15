import express from "express";
import {
  showAllEventsHandler,
  showAllCreatedEvents,
  showAllJoinedEvents,
  createEventHandler,
  joinEventHandler,
  leaveEventHandler,
  deleteEventHandler,
} from "../controllers/event.controller";
import { authorizationCheck } from "../middleware/authorization";

const router = express.Router();

router.get("/event", showAllEventsHandler);
router.get("/event/joined", authorizationCheck, showAllJoinedEvents);
router.get("/event/created", authorizationCheck, showAllCreatedEvents);
router.post("/event/create", authorizationCheck, createEventHandler);
router.put("/event/join/:id", authorizationCheck, joinEventHandler);
router.delete("/event/leave/:id", authorizationCheck, leaveEventHandler);
router.delete("/event/delete/:id", authorizationCheck, deleteEventHandler);

export default router;
