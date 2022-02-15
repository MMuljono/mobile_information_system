/*
  Warnings:

  - You are about to drop the column `min` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "min",
ADD COLUMN     "current" INTEGER;
