-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(140) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(140) NOT NULL,
    "note" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "reps" INTEGER NOT NULL DEFAULT 1,
    "position" INTEGER NOT NULL DEFAULT 0,
    "workoutId" INTEGER NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesOnSets" (
    "setId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "weight" DECIMAL(5,2),
    "reps_time" TEXT NOT NULL DEFAULT '1',
    "position" INTEGER NOT NULL DEFAULT 0,
    "note" TEXT,

    CONSTRAINT "ExercisesOnSets_pkey" PRIMARY KEY ("setId","exerciseId")
);

-- CreateTable
CREATE TABLE "_ExerciseToSet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExerciseToSet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Set_workoutId_key" ON "Set"("workoutId");

-- CreateIndex
CREATE INDEX "ExercisesOnSets_setId_idx" ON "ExercisesOnSets"("setId");

-- CreateIndex
CREATE INDEX "ExercisesOnSets_exerciseId_idx" ON "ExercisesOnSets"("exerciseId");

-- CreateIndex
CREATE INDEX "_ExerciseToSet_B_index" ON "_ExerciseToSet"("B");

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesOnSets" ADD CONSTRAINT "ExercisesOnSets_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesOnSets" ADD CONSTRAINT "ExercisesOnSets_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_B_fkey" FOREIGN KEY ("B") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;
