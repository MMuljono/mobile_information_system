import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export const showAllEvents = async () => {
  return await prisma.event.findMany();
};

export const joinEvent = async ({
  userId,
  eventId,
}: {
  userId: number;
  eventId: number;
}) => {
  try {
    return await prisma.userEvents.create({
      data: { userId, eventId },
    });
  } catch (e) {
    return null;
  }
};

export const createEvent = async (eventData: Prisma.EventCreateInput) => {
  try {
    const createdEvent = await prisma.event.create({
      data: { ...eventData },
    });
    const { id, creatorId } = createdEvent;
    await joinEvent({ userId: creatorId, eventId: id });
    return createdEvent;
  } catch (e) {
    return null;
  }
};

export const leaveEvent = async ({
  userId,
  eventId,
}: {
  userId: number;
  eventId: number;
}) => {
  try {
    return await prisma.userEvents.deleteMany({
      where: {
        userId,
        eventId,
      },
    });
  } catch (e) {
    return null;
  }
};

export const clearingUserEvents = async (eventId: number) => {
  try {
    return await prisma.userEvents.deleteMany({
      where: {
        eventId: eventId,
      },
    });
  } catch (e) {
    return null;
  }
};

export const deleteEvent = async ({
  userId,
  eventId,
}: {
  userId: number;
  eventId: number;
}) => {
  try {
    await clearingUserEvents(eventId);
    return prisma.event.deleteMany({
      where: {
        id: eventId,
        creatorId: userId,
      },
    });
  } catch (e) {
    return null;
  }
};

export const showCreatedEvents = async (userId: number) => {
  try {
    return await prisma.event.findMany({
      where: {
        creatorId: userId,
      },
    });
  } catch (e) {
    return null;
  }
};

export const showJoinedEvents = async (userId: number) => {
  try {
    return await prisma.userEvents.findMany({
      where: {
        userId: userId,
      },
      include: {
        event: true,
      },
    });
  } catch (e) {
    return null;
  }
};
