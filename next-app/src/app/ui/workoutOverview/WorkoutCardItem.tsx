import * as React from "react";
import { WorkoutWithSets } from "@/app/lib/data/workout";

export default function WorkoutCardItem({
  workout,
}: {
  workout: WorkoutWithSets;
}) {
  const getWorkoutSetsAndExercisesCounts = (): {
    exercisesCount: number;
    setsCount: number;
  } => {
    const exercisesCount = workout.sets.reduce(
      (acc, set) => acc + set.exercises.length,
      0,
    );
    const setsCount = workout.sets.length;
    return { exercisesCount, setsCount };
  };

  const {
    exercisesCount,
    setsCount,
  }: { exercisesCount: number; setsCount: number } =
    getWorkoutSetsAndExercisesCounts();

  return (
    <div className=" bg-zinc-100 dark:bg-zinc-900 rounded-lg rounded-bl-4xl rounded-tr-4xl p-4">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl">{workout.name}</h4>
        </div>
        <div className="flex gap-4 text-sm text-zinc-400">
          <p className="mb-2">
            <span className="italic font-bold text-lg bg-lime-500 dark:bg-lime-700 text-zinc-600 dark:text-zinc-300 rounded-full px-3 py-1 inline-block">
              {setsCount} {setsCount <= 1 ? "set" : "sets"}
            </span>
          </p>
          <p>
            <span className="italic font-bold text-lg border-1 border-lime-500 dark:border-lime-700 bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300 rounded-full px-3 py-1 inline-block">
              {exercisesCount} {exercisesCount <= 1 ? "exercise" : "exercises"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
