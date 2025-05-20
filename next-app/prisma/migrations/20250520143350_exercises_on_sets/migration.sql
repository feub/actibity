/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Set` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- DropIndex
DROP INDEX "Set_workoutId_key";

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "exerciseId";
