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
    <div className=" bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl">{workout.name}</h4>
          {workout.note && (
            <p className="text-sm text-zinc-500">{workout.note}</p>
          )}
        </div>
        <div className="text-right text-sm text-zinc-400">
          <p className="mb-2">
            <span className="italic font-bold text-lg bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-300 rounded-full px-3 py-1 inline-block">
              {setsCount} {setsCount <= 1 ? "set" : "sets"}
            </span>
          </p>
          <p>
            <span className="italic font-bold text-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 rounded-full px-3 py-1 inline-block">
              {exercisesCount} {exercisesCount <= 1 ? "exercise" : "exercises"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
