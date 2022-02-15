import { Request, Response } from "express";
import {
  showAllEvents,
  createEvent,
  joinEvent,
  leaveEvent,
  deleteEvent,
  showCreatedEvents,
  showJoinedEvents,
} from "../services/event.service";
import geolocatorHandler from "../utils/geocoder";

export const showAllEventsHandler = async (req: Request, res: Response) => {
  try {
    const allEvents = await showAllEvents();
    if (allEvents) {
      return res.status(200).json(allEvents);
    }
  } catch (e) {
    res.status(404).json({ message: "Error" });
  }
};

export const showAllJoinedEvents = async (req: Request, res: Response) => {
  const userId = res.locals.user.userId;
  try {
    const joinedEvents = await showJoinedEvents(userId);
    if (joinedEvents) {
      return res.status(200).json(joinedEvents);
    }
  } catch (e) {
    res.status(404).json({ message: "Error" });
  }
};

export const showAllCreatedEvents = async (req: Request, res: Response) => {
  const userId = res.locals.user.userId;
  try {
    const createdEvents = await showCreatedEvents(userId);
    if (createdEvents) {
      return res.status(200).json(createdEvents);
    }
  } catch (e) {
    res.status(404).json({ message: "Error" });
  }
};

export const joinEventHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Event not selected",
    });
  }
  const userId = res.locals.user.userId;
  try {
    const joinedEvent = await joinEvent({ userId, eventId: Number(id) });
    if (joinedEvent) {
      res.status(200).json({
        message: "Succesfully joined event",
      });
    } else {
      res.status(400).json({
        message: "Already joined the event",
      });
    }
  } catch (e) {
    res.status(404).json({ message: "Error" });
  }
};

export const createEventHandler = async (req: Request, res: Response) => {
  const { city, address, postcode, ...rest } = req.body;
  try {
    const geoLocation = await geolocatorHandler(city, postcode, address);
    if (geoLocation) {
      const eventData = {
        ...rest,
        city: city,
        address: address,
        postcode: Number(postcode),
        creatorId: res.locals.user.userId,
        latitude: Number(geoLocation.lat),
        longtitude: Number(geoLocation.lon),
      };
      const createdEvent = await createEvent(eventData);
      if (createdEvent) {
        res.status(200).json({
          message: "Event created successfully",
        });
      } else {
        res.status(400).json({
          message: "Input values were not correct",
        });
      }
    } else {
      res.status(400).json({
        message: "Location not valid",
      });
    }
  } catch (e) {
    res.status(404).json({ message: "Error" });
  }
};

export const deleteEventHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Event not selected",
    });
  }
  const userId = res.locals.user.userId;

  await deleteEvent({ userId, eventId: Number(id) });
  return res.status(200).json({
    message: "Event deleted",
  });
};

export const leaveEventHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Event not selected",
    });
  }
  const userId = res.locals.user.userId;

  await leaveEvent({ userId, eventId: Number(id) });
  return res.status(200).json({
    message: "Leaved the event",
  });
};
