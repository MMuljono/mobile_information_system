/*
  Warnings:

  - You are about to drop the column `current` on the `Event` table. All the data in the column will be lost.
  - Changed the type of `time` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "current",
ADD COLUMN     "contactInfo" TEXT,
DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;
