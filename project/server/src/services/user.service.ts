import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export const createUser = async (userData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: {
      ...userData,
    },
  });
};

export const findUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
