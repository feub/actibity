-- DropForeignKey
ALTER TABLE "ExercisesOnSets" DROP CONSTRAINT "ExercisesOnSets_setId_fkey";

-- AddForeignKey
ALTER TABLE "ExercisesOnSets" ADD CONSTRAINT "ExercisesOnSets_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;
