/*
  Warnings:

  - You are about to drop the `_ExerciseToSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToSet" DROP CONSTRAINT "_ExerciseToSet_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToSet" DROP CONSTRAINT "_ExerciseToSet_B_fkey";

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "exerciseId" INTEGER;

-- DropTable
DROP TABLE "_ExerciseToSet";

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
